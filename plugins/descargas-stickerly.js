import fetch from "node-fetch"
import { sticker } from "../lib/sticker.js"
import fs from "fs"
import path from "path"

const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🍧 Ingresa la URL de un pack de *Stickerly*.\n\n🌱 Ejemplo:\n> ${usedPrefix + command} https://sticker.ly/s/4I2FC0`)
  }

  try {
    let url = `${API_STICKERLY}?url=${encodeURIComponent(args[0])}`
    let res = await fetch(url)
    if (!res.ok) throw new Error(`❌ Error al conectar con la API (${res.status})`)
    let json = await res.json()
    if (!json.status || !json.data || !json.data.stickers) throw "⚠️ No se pudo obtener el pack. Verifica el enlace."

    let data = json.data

    let info = `
╭━━━〔 🌸 *STICKERLY PACK* 🌸 〕━━⬣
┃ ✨ *Nombre:* ${data.name}
┃ 👤 *Autor:* ${data.author}
┃ 📦 *Stickers:* ${data.total}
┃ 👀 *Vistas:* ${data.viewCount}
┃ 📤 *Exportados:* ${data.exportCount}
┃ 🎭 *Animado:* ${data.isAnimated ? "Sí" : "No"}
┃ 🔗 *Pack:* ${data.url}
╰━━━━━━━━━━━━━━━━━━⬣
👥 *Usuario:* ${data.username}
👤 *Followers:* ${data.followers}
    `.trim()

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: `${data.name}`,
          body: `🍃 Autor: ${data.author || "Desconocido"} • ${data.total} stickers`,
          thumbnailUrl: data.preview,
          sourceUrl: data.url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    const tempDir = path.join("./tmp", `stickers_${Date.now()}`)
    fs.mkdirSync(tempDir, { recursive: true })

    let stickerBuffers = []

    for (let i = 0; i < data.stickers.length; i++) {
      try {
        let stick = data.stickers[i]
        let img = await fetch(stick)
        let buffer = await img.arrayBuffer()
        let stickerBuf = await sticker(Buffer.from(buffer), false, data.name, data.author)
        stickerBuffers.push(stickerBuf)
      } catch (e) {
        console.log("⚠️ Error con un sticker:", e)
      }
    }

    await conn.sendMessage(m.chat, {
      sticker: stickerBuffers,
      packname: data.name,
      author: data.author || "Stickerly",
    }, { quoted: m })

    fs.rmSync(tempDir, { recursive: true, force: true })
    await m.react("✅")

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al descargar los stickers del pack.")
  }
}

handler.help = ["stickerlydl <url>"]
handler.tags = ["sticker", "download"]
handler.command = ["stickerlydl", "stickerpack", "dls"]

export default handler