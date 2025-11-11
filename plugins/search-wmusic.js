import acrcloud from 'acrcloud'
import ytsearch from 'yt-search'
import baileys from '@whiskeysockets/baileys'

const { generateWAMessageFromContent, generateWAMessageContent, proto } = baileys

const acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m, { conn, usedPrefix, command }) => {
try {
const q = m.quoted ? m.quoted : m
const mime = q.mimetype || ''
const mtype = q.mtype || ''

if (!/audio|video/.test(mime) && !/audioMessage|videoMessage/.test(mtype)) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a un audio o video corto para buscar el título de la canción.` }, { quoted: m })
}

await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })

const buffer = await q.download?.()
if (!buffer) return conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el archivo, contacte con soporte.` }, { quoted: m })

const result = await acr.identify(buffer)
const { status, metadata } = result

if (status.code !== 0) return conn.sendMessage(m.chat, { text: `📍  No se ha podido identificar la canción, recuerde que no debe tener otros sonidos de fondo como voces o vehículos.` }, { quoted: m })

const music = metadata.music?.[0]
if (!music) return conn.sendMessage(m.chat, { text: `📍  No se ha encontrado una información suficiente para la canción.` }, { quoted: m })

const title = music.title || 'Desconocido'
const artist = music.artists?.map(v => v.name).join(', ') || 'Desconocido'
const album = music.album?.name || 'Desconocido'
const release = music.release_date || 'Desconocida'

const yt = await ytsearch(`${title} ${artist}`)
const video = yt.videos.length > 0 ? yt.videos[0] : null

if (video) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url: video.thumbnail } },
{ upload: conn.waUploadToServer }
)

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `·─┄ · ✦ *Music : Search* ✦ ·`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: `❒ *Título:* ${title}
❒ *Artista:* ${artist}
❒ *Álbum:* ${album}
❒ *Publicado:* ${release}`
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{ name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copiar", id: video.url, copy_code: video.url })}
]
})
})
}
}
}, { quoted: m })

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} else {
//conn.sendMessage(m.chat, { text: `Nulo` }, { quoted: m })
}

} catch (e) {
console.error(e)
conn.sendMessage(m.chat, { text: `📍  No se ha podido encontrar la canción.\n- Esto puede deberse a que el audio o video este editado, la canción no esta disponible, hay voces de personas al fondo, o ruidos sea vehículos o otros.` }, { quoted: m })
}
}

handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['quem', 'wmusic']

export default handler