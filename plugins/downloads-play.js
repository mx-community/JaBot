// 🌿 Rin Itoshi Bot | Comando de música (YouTube Downloader)
// ✨ Optimizado y decorado por Shadow & OmarGranda

import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) return conn.reply(m.chat, `🌴 Por favor, ingresa el nombre o enlace del video.`, m, rcanal)

    await m.react('⏲️')
    await conn.reply(m.chat, '🍊 *Buscando la música, espera un momento...*', m)

    const videoMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text

    const search = await yts(query)
    const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
    if (!result) throw '⚠️ No se encontraron resultados.'

    const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
    if (seconds > 600) throw '⚠ El video supera el límite de duración (10 minutos).'

    const vistas = formatViews(views)
    const info = `🍃 Descargando *<${title}>*\n\n> ❑ Canal » *${author.name}*\n> ♡ Vistas » *${vistas}*\n> ✧︎ Duración » *${timestamp}*\n> ☁︎ Publicado » *${ago}*\n> ➪ Link » ${url}
`

    const thumb = (await conn.getFile(thumbnail)).data
    await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: m })

    if (['play', 'mp3'].includes(command)) {
     // await conn.reply(m.chat, '🎵 *Procesando audio...*', m)
      const audio = await getAud(url)
      if (!audio?.url) throw '⚠ No se pudo obtener el audio.'
      await conn.sendMessage(m.chat, { audio: { url: audio.url }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      await m.react('✔️')
    }

    else if (['play2', 'mp4'].includes(command)) {
      //await conn.reply(m.chat, '🎬 *Procesando video...*', m)
      const video = await getVid(url)
      if (!video?.url) throw '⚠ No se pudo obtener el video.'
      await conn.sendFile(m.chat, video.url, `${title}.mp4`, `⭐ *${title}*`, m)
      await m.react('✔️')
    }

  } catch (e) {
    await m.react('✖️')
    console.error(e)
    return conn.reply(m.chat, typeof e === 'string' ? e : '⚠︎ Ocurrió un error inesperado.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + e.message, m)
  }
}

handler.command = handler.help = ['play', 'play2', 'mp3', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

async function getAud(url) {
  const g = global.APIs || {}
  const apis = [
    { api: 'ZenzzXD', endpoint: `${g.zenzxz?.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${g.zenzxz?.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'Yupra', endpoint: `${g.yupra?.url}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.enlace },
    { api: 'Vreden', endpoint: `${g.vreden?.url}/api/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url }
  ]
  return await fetchFromApis(apis)
}

async function getVid(url) {
  const g = global.APIs || {}
  const apis = [
    { api: 'ZenzzXD', endpoint: `${g.zenzxz?.url}/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${g.zenzxz?.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'Yupra', endpoint: `${g.yupra?.url}/api/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.formatos?.[0]?.url },
    { api: 'Vreden', endpoint: `${g.vreden?.url}/api/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url }
  ]
  return await fetchFromApis(apis)
}

async function fetchFromApis(apis) {
  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
      clearTimeout(timeout)
      const link = extractor(res)
      if (!link) continue
      return { url: link, api }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return null
}

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}