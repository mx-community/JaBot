import fetch from "node-fetch"
import Jimp from "jimp"

let handler = async (m, { conn, text }) => {
  if (!text && !m.quoted) {
    return m.reply(`✨ *Envía una imagen*`)
  }

  try {
    let buffer

    if (text) {
      const res = await fetch(text)
      if (!res.ok) throw new Error("No se pudo descargar la imagen desde la URL.")
      buffer = await res.arrayBuffer()
      buffer = Buffer.from(buffer)
    } else if (m.quoted && /image/.test(m.quoted.mtype)) {
      buffer = await m.quoted.download()
    } else {
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

    const { bitmap } = resized
    const format = Jimp.MIME_JPEG.split("/")[1]
    const sizeKB = (outBuffer.length / 1024).toFixed(1)

    const base64Preview = outBuffer.toString("base64").substring(0, 200) + "..."

    await conn.sendMessage(m.chat, {
      image: outBuffer,
      caption: `🎨 *Miniatura generada con éxito*\n\n` +
               `🖼️ *Formato:* ${format.toUpperCase()}\n` +
               `📏 *Resolución:* ${bitmap.width}x${bitmap.height}px\n` +
               `📦 *Tamaño:* ${sizeKB} KB\n` +
               `💎 *Calidad final:* ${quality + 10}%\n\n` +
               `📋 *Base64 (inicio)*:\n\`\`\`${base64Preview}\`\`\``,
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    await m.reply("❌ *Error al procesar la imagen.* Asegúrate de que el enlace o archivo sea válido.")
  }
}

handler.command = /^miniatura|mini$/i
export default handler