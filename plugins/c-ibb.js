import fs from 'fs'
import FormData from 'form-data'
import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  if (!mime.startsWith('image/')) {
    return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen.` }, { quoted: m })
  }
  await m.react('⏳')

  let media = await q.download()
  let formData = new FormData()
  formData.append('image', media, { filename: 'file' })

  let api = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, {
    headers: {
      ...formData.getHeaders()
    }
  })

  if (api.data.data) {
    let txt = `·─┄ · ✦ *Upload : Success* ✦ ·

\t𝇈 📍  Imagen subida correctamente a ibb.

\t\t⩩ *Enlace :* ${api.data.data.id}

\t\t⩩ *Extención :* ${api.data.data.image.extension}

\t\t⩩ *Titulo :* ${q.filename}

> ${textbot}`
const ppIbb = Buffer.from(await (await fetch(`https://qu.ax/sHcff.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  U P L O A D  :  F I L E  々", 
body: null, 
thumbnail: ppIbb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

    //await conn.sendFile(m.chat, api.data.data.url, 'ibb.jpg', txt, m, null, rcanal)
    await m.react('✅')
  } else {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = error.ibb` }, { quoted: m })
  }
}
handler.tags = ['tools']
handler.help = ['ibb']
handler.command = ["ibb"]
export default handler


