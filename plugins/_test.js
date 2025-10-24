import fetch from 'node-fetch'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'
import { proto } from '@whiskeysockets/baileys'

async function uploadToYupra(buffer, filename = 'file.bin') {
  const ft = await fileTypeFromBuffer(buffer).catch(() => null)
  const detectedName = ft ? `${filename.split('.')[0]}.${ft.ext}` : filename
  const detectedMime = ft ? ft.mime : 'application/octet-stream'

  const form = new FormData()
  form.append('file', buffer, { filename: detectedName, contentType: detectedMime })

  const res = await fetch('https://cdn.yupra.my.id/upload', {
    method: 'POST',
    body: form,
    headers: form.getHeaders()
  })

  const text = await res.text()
  let json
  try { json = JSON.parse(text) } catch {}
  const url = json?.url || json?.data?.url || json?.file || json?.result?.url ||
    (text.match(/https?:\/\/[^\s'"]+/)?.[0]) ||
    res.headers.get('location')
  if (!url) throw new Error('No se encontró una URL válida en la respuesta.')

  return url
}

const handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return m.reply(`🍃 Envía o responde a un archivo (imagen, video, audio o documento) con:\n> ${usedPrefix + command}`)

  try {
    const media = await q.download()
    const url = await uploadToYupra(media, 'archivo')
    const caption = `✅ *Archivo subido con éxito:*\n\n🔗 ${url}`

    const msg = {
      messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
      interactiveMessage: {
        body: { text: caption },
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: '🔗 Copiar enlace',
                id: 'copy_link_btn',
                copy_code: `${url}`
              })
            }
          ]
        })
      }
    }

    await conn.relayMessage(m.chat, { viewOnceMessage: { message: msg } }, {})
  } catch (e) {
    console.error(e)
    m.reply('Error al subir el archivo.')
  }
}

handler.help = ['upload', 'tourl']
handler.tags = ['tools']
handler.command = /^upload|tourl$/i

export default handler