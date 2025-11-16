import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { ogmp3 } from '../lib/youtubedl.js'
const LimitAud = 725 * 1024 * 1024 // Limite de audio 725MB
const LimitVid = 425 * 1024 * 1024 // Limite del video 425MB
let tempStorage = {}

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de la canción o un enlace para buscar la canción.\n\n• Por ejemplo:\n*${usedPrefix + command}* Golden Brown - The Stranglers` }, { quoted: m })
const yt_play = await search(args.join(' '))
const ytplay2 = await yts(text)
const texto1 = `·─┄ · ✦ *Play : YouTube* ✦ ·
> ${yt_play[0].title}

⊹ ✎ *Publicado:* ${yt_play[0].ago}
⊹ ✎ *Vistas:* ${MilesNumber(yt_play[0].view)}
⊹ ✎ *Duración:* ${secondString(yt_play[0].duration.seconds)}
⊹ ✎ *Enlace:* ${yt_play[0].url.replace(/^https?:\/\//, '')}

📍  Reaccione a este mensaje con lo siguiente:
> "❤️"  *(Descarga en audio)*
> "👍"  *(Descarga en video)*
`.trim()

tempStorage[m.sender] = {url: yt_play[0].url, title: yt_play[0].title}

await conn.sendMessage(m.chat, { text: texto1, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: yt_play[0].title, 
body: yt_play[0].ago, 
thumbnail: yt_play[0].thumbnail, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}

handler.before = async (m, {conn}) => {
const text = m.text.trim().toLowerCase()
if (!['❤️', 'audio', '👍', 'video'].includes(text)) return
const userVideoData = tempStorage[m.sender]
if (!userVideoData || !userVideoData.url) return
const [input, qualityInput = text === '❤️' || text === 'audio' ? '320' : '720'] = userVideoData.title.split(' ')
const audioQualities = ['64', '96', '128', '192', '256', '320']
const videoQualities = ['240', '360', '480', '720', '1080']
const isAudio = text === '❤️' || text === 'audio'
const selectedQuality = (isAudio ? audioQualities : videoQualities).includes(qualityInput) ? qualityInput : isAudio ? '320' : '720'

const audioApis = [
{url: () => ogmp3.download(userVideoData.url, selectedQuality, 'audio'), extract: (data) => ({data: data.result.download, isDirect: false})},
{url: () => ytmp3(userVideoData.url), extract: (data) => ({data, isDirect: true})},
{
url: () =>
fetch(`https://api.neoxr.eu/api/youtube?url=${userVideoData.url}&type=audio&quality=128kbps&apikey=GataDios`).then((res) => res.json()),
extract: (data) => ({data: data.data.url, isDirect: false})
},
{
url: () => fetch(`${global.APIs.stellar.url}/dow/ytmp3?url=${userVideoData.url}&key=GataDios`).then((res) => res.json()),
extract: (data) => ({data: data?.data?.dl, isDirect: false})
},
{
url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.dl, isDirect: false})
},
{
url: () => fetch(`${apis}/download/ytmp3?url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.status ? data.data.download.url : null, isDirect: false})
},
{
url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.result.download.url, isDirect: false})
}
]

const videoApis = [
{url: () => ogmp3.download(userVideoData.url, selectedQuality, 'video'), extract: (data) => ({data: data.result.download, isDirect: false})},
{url: () => ytmp4(userVideoData.url), extract: (data) => ({data, isDirect: false})},
{
url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.dl, isDirect: false})
},
{
url: () => fetch(`https://api.neoxr.eu/api/youtube?url=${userVideoData.url}&type=video&quality=720p&apikey=GataDios`).then((res) => res.json()),
extract: (data) => ({data: data.data.url, isDirect: false})
},
{
url: () => fetch(`${global.APIs.stellar.url}/dow/ytmp4?url=${userVideoData.url}&key=GataDios`).then((res) => res.json()),
extract: (data) => ({data: data?.data?.dl, isDirect: false})
},
{
url: () => fetch(`${apis}/download/ytmp4?url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.status ? data.data.download.url : null, isDirect: false})
},
{
url: () => fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${userVideoData.url}`).then((res) => res.json()),
extract: (data) => ({data: data.result.media.mp4, isDirect: false})
}
]

const download = async (apis) => {
let mediaData = null
let isDirect = false
for (const api of apis) {
try {
const data = await api.url()
const {data: extractedData, isDirect: direct} = api.extract(data)
if (extractedData) {
const size = await getFileSize(extractedData)
if (size >= 1024) {
mediaData = extractedData
isDirect = direct
break
}
}
} catch (e) {
console.log(`Error con API: ${e}`)
continue
}
}
return {mediaData, isDirect}
}
try {
if (text === '❤️' || text === 'audio') {
await conn.sendMessage(m.chat, { text: `Descargando el audio, espere un momento...` }, { quoted: m || null })
const {mediaData, isDirect} = await download(audioApis)
if (mediaData) {
const fileSize = await getFileSize(mediaData)
if (fileSize > LimitAud) {
await conn.sendMessage(
m.chat,
{document: isDirect ? mediaData : {url: mediaData}, mimetype: 'audio/mpeg', fileName: `${userVideoData.title}.mp3`},
{quoted: m || null}
)
} else {
await conn.sendMessage(m.chat, {audio: isDirect ? mediaData : {url: mediaData}, mimetype: 'audio/mpeg'}, {quoted: m || null})
}
} else {
await conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el audio.\n- Esto puede deberse un fallo en la api o un error.` }, { quoted: m || null })
}
} else if (text === '👍' || text === 'video') {
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m || null })
const {mediaData, isDirect} = await download(videoApis)
if (mediaData) {
const fileSize = await getFileSize(mediaData)
const messageOptions = {fileName: `${userVideoData.title}.mp4`, caption: `·─┄ · ✦ *Video : Download* ✦ ·\n\n⊹ ✎ *Titulo:* ${userVideoData.title}`, mimetype: 'video/mp4'}
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, {document: isDirect ? mediaData : {url: mediaData}, ...messageOptions}, {quoted: m || null})
} else {
await conn.sendMessage(m.chat, {video: isDirect ? mediaData : {url: mediaData}, ...messageOptions}, {quoted: m || null})
}
} else {
await conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el video.\n- Esto puede deberse un fallo en la api o un error.` }, { quoted: m || null })
}
}
} catch (error) {
console.error(error)
} finally {
delete tempStorage[m.sender]
}
}
handler.command = ["testplay"]
export default handler

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options})
return search.videos
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g
const rep = '$1.'
const arr = number.toString().split('.')
arr[0] = arr[0].replace(exp, rep)
return arr[1] ? arr.join('.') : arr[0]
}

function secondString(seconds) {
seconds = Number(seconds)
const d = Math.floor(seconds / (3600 * 24))
const h = Math.floor((seconds % (3600 * 24)) / 3600)
const m = Math.floor((seconds % 3600) / 60)
const s = Math.floor(seconds % 60)
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : ''
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : ''
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : ''
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : ''
return dDisplay + hDisplay + mDisplay + sDisplay
}

const getBuffer = async (url) => {
try {
const response = await fetch(url)
const buffer = await response.arrayBuffer()
return Buffer.from(buffer)
} catch (error) {
console.error('Error al obtener el buffer', error)
throw new Error('Error al obtener el buffer')
}
}

async function getFileSize(url) {
try {
const response = await fetch(url, {method: 'HEAD'})
return parseInt(response.headers.get('content-length') || 0)
} catch {
return 0
}
}

async function fetchInvidious(url) {
const apiUrl = 'https://invidious.io/api/v1/get_video_info'
const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`)
const data = await response.json()
if (data && data.video) {
const videoInfo = data.video
return videoInfo
} else {
throw new Error('No se pudo obtener información del video desde Invidious')
}
}

function getBestVideoQuality(videoData) {
const preferredQualities = ['720p', '360p', 'auto']
const availableQualities = Object.keys(videoData.video)
for (let quality of preferredQualities) {
if (availableQualities.includes(quality)) {
return videoData.video[quality].quality
}
}
return '360p'
}

async function ytMp3(url) {
return new Promise((resolve, reject) => {
ytdl
.getInfo(url)
.then(async (getUrl) => {
let result = []
for (let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i]
if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
let {contentLength} = item
let bytes = await bytesToSize(contentLength)
result[i] = {audio: item.url, size: bytes}
}
}
let resultFix = result.filter((x) => x.audio != undefined && x.size != undefined)
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`)
let tinyUrl = tiny.data
let title = getUrl.videoDetails.title
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
resolve({title, result: tinyUrl, result2: resultFix, thumb})
})
.catch(reject)
})
}

async function ytMp4(url) {
return new Promise(async (resolve, reject) => {
ytdl
.getInfo(url)
.then(async (getUrl) => {
let result = []
for (let i = 0; i < getUrl.formats.length; i++) {
let item = getUrl.formats[i]
if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
let {qualityLabel, contentLength} = item
let bytes = await bytesToSize(contentLength)
result[i] = {video: item.url, quality: qualityLabel, size: bytes}
}
}
let resultFix = result.filter((x) => x.video != undefined && x.size != undefined && x.quality != undefined)
let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`)
let tinyUrl = tiny.data
let title = getUrl.videoDetails.title
let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
resolve({title, result: tinyUrl, rersult2: resultFix[0].video, thumb})
})
.catch(reject)
})
                         }
    
