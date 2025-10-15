import fs from "fs"
import axios from "axios"
import path from "path"
import { fileTypeFromBuffer } from "file-type"

const GITHUB_USER = "Shadow-nex"           // tu usuario de GitHub
const GITHUB_REPO = "Storage-CS"           // tu repositorio
const GITHUB_TOKEN = "TU_TOKEN"            // tu token personal de GitHub

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ""
    if (!mime) return m.reply("📸 Envía o responde a una imagen, video, sticker o archivo para subirlo a Storage-CS.")

    const media = await q.download()
    const type = await fileTypeFromBuffer(media)
    const ext = type?.ext || mime.split("/")[1] || "bin"

    // Detectar tipo de archivo
    let folder = "otros"
    if (mime.includes("image")) folder = "imagenes"
    else if (mime.includes("video")) folder = "videos"
    else if (mime.includes("audio")) folder = "audios"
    else if (mime.includes("webp")) folder = "stickers"
    else if (mime.includes("zip") || mime.includes("rar")) folder = "archivos"

    const fileName = `${folder}/${Date.now()}.${ext}`
    const encoded = Buffer.from(media).toString("base64")

    const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${fileName}`
    await axios.put(
      url,
      {
        message: `Upload ${fileName}`,
        content: encoded,
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    )

    const rawLink = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/${fileName}`
    const sizeKB = (media.length / 1024).toFixed(2)
    const tipo = folder.charAt(0).toUpperCase() + folder.slice(1)

    const txt = `
╭━〔 ☁️ *STORAGE-CS UPLOAD* 〕━⬣
┃ 📦 Tipo: *${tipo}*
┃ ⚖️ Peso: *${sizeKB} KB*
┃ 📁 Carpeta: *${folder}/*
┃ 🔗 Link: 
┃ ${rawLink}
╰━━━━━━━━━━━━━━━━⬣
    `.trim()

    await conn.reply(m.chat, txt, m)

  } catch (err) {
    console.error(err)
    m.reply("❌ Error al subir el archivo a GitHub.")
  }
}

handler.command = ["autostorage", "cs"]
handler.help = ["autostorage"]
handler.tags = ["tools"]

export default handler