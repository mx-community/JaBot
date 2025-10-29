import fetch from "node-fetch"
import Jimp from "jimp"
import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"

let handler = async (m, { conn, text }) => {
  if (!text && !m.quoted) {
    return m.reply(`🍬 *Envía una imagen*`)
  }

  await m.react(rwait)

  try {
    let buffer

    if (text) {
      const res = await fetch(text)
      if (!res.ok) throw new Error("No se pudo descargar la imagen desde la URL.")
      buffer = Buffer.from(await res.arrayBuffer())
    } 

    else if (m.quoted && /image/.test(m.quoted.mtype)) {
      buffer = await m.quoted.download()
    } 
    else {
      throw new Error("❌ No se detectó una imagen válida.")
    }

    const image = await Jimp.read(buffer)
    let quality = 90
    let resized, outBuffer
    do {
      resized = image.clone().resize(200, Jimp.AUTO).quality(quality)
      outBuffer = await resized.getBufferAsync(Jimp.MIME_JPEG)
      quality -= 10
    } while (outBuffer.length > 64 * 1024 && quality > 10)

    const catboxURL = await subirCatbox(outBuffer)

    const { bitmap } = resized
    const format = Jimp.MIME_JPEG.split("/")[1]
    const sizeKB = (outBuffer.length / 1024).toFixed(1)
    const base64Preview = outBuffer.toString("base64").substring(0, 200) + "..."

    const caption = `🌸 *M I N I A T U R A  -  G E N E R A D A* 🌸

🖼️ *Formato:* ${format.toUpperCase()}
📏 *Resolución:* ${bitmap.width}x${bitmap.height}px
📦 *Tamaño:* ${sizeKB} KB
💎 *Calidad final:* ${quality + 10}%
🌐 *Catbox:* ${catboxURL}

📋 *Base64 (inicio)*:
\`\`\`${base64Preview}\`\`\``

    await conn.sendMessage(m.chat, {
      image: outBuffer,
      caption,
    }, { quoted: m })

    await m.react(done)
  } catch (e) {
    console.error(e)
    await m.react(error)
    await m.reply("*Error al procesar o subir la imagen.* Asegúrate de que el enlace o archivo sea válido.")
  }
}

handler.command = ['mini']
export default handler


async function subirCatbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || { ext: "jpg", mime: "image/jpeg" }
  const blob = new Blob([content], { type: mime })
  const formData = new FormData()
  const randomBytes = crypto.randomBytes(6).toString("hex")
  formData.append("reqtype", "fileupload")
  formData.append("fileToUpload", blob, randomBytes + "." + ext)

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 11) RinBot/1.0"
    },
  })

  if (!res.ok) throw new Error("Fallo al subir a Catbox.")
  return await res.text()
}