import fetch from 'node-fetch'

const regex = /^(?:https:\/\/|git@)github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?$/i
const handler = async (m, { conn, usedPrefix, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre del repositorio de *GitHub* para buscar o un enlace para descargar los archivos.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let info = ''
let image
let zipBuffer, zipName
let repos = []
const match = text.match(regex)
if (match) {
const [, user, repo] = match
const repoRes = await fetch(`https://api.github.com/repos/${user}/${repo}`)
const zipRes = await fetch(`https://api.github.com/repos/${user}/${repo}/zipball`)
const repoData = await repoRes.json()
zipName = zipRes.headers.get('content-disposition')?.match(/filename=(.*)/)?.[1]
if (!zipName) zipName = `${repo}-${user}.zip`
zipBuffer = await zipRes.buffer()
repos.push(repoData)
image = global.mMages
} else {
const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(text)}`)
const json = await res.json()
if (!json.items.length) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados sobre la búsqueda.` }, { quoted: m })
repos = json.items
image = await (await fetch(repos[0].owner.avatar_url)).buffer()
}
info += `·─┄ · ✦ *GitHub : Result* ✦ ·\n\n`
info += repos.map((repo, index) => `🜲 *Repo:* ${repo.name}
⎙ *Creador:* @${repo.owner.login}
⏍ *Actualización:* ${formatDate(repo.created.at)}
⎋ *Enlace:* ${repo.clone_url}
`).join('\n────────────────────\n')
await conn.sendMessage(m.chat, { text: info.trim(), contextInfo: { externalAdReply: { 
title: "📍  Resultados encontrados.", 
body: "Buscador y descargador de archivos GitHub.", 
thumbnail: image, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
if (zipBuffer && zipName) {
await conn.sendFile(m.chat, zipBuffer, zipName, null, m)
}
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['gitclone']
handler.tags = ['github']
handler.command = ['github']

export default handler

function formatDate(n, locale = 'es') {
const d = new Date(n)
return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
}