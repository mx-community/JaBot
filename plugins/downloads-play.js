import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim())
      return conn.reply(m.chat, `*🎐 Por favor, ingresa el nombre de la música a descargar.*`, m, rcanal)

    await m.react('🕒')

    const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
    const search = await yts(query)
    const result = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
    if (!result) throw 'ꕥ No se encontraron resultados.'

    const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
    if (seconds > 1800) throw '⚠ El video supera el límite de duración (10 minutos).'

    const vistas = formatViews(views)
    const info = `「✦」Descargando *<${title}>*\n
> ❑ Canal » *${author.name}*
> ♡ Vistas » *${vistas}*
> ✧︎ Duración » *${timestamp}*
> ☁︎ Publicado » *${ago}*
> ➪ Link » ${url}`

    const thumb = (await conn.getFile(thumbnail)).data
    await conn.sendMessage(m.chat, { image: thumb, caption: info, ...rcanal }, { quoted: fkontak })

    // AUDIO
    if (['play', 'playaudio'].includes(command)) {
      const audio = await getAud(url)
      if (!audio?.url) throw '⚠ No se pudo obtener el audio.'

      await conn.sendMessage(m.chat, {
        audio: { url: audio.url },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: `🎋 Descarga Completa: Servidor: \`${audio.api}\``,
            body: `Servidor usado: ${audio.api}`,
            mediaType: 1,
            thumbnail: thumb,
            mediaUrl: 'https://chat.whatsapp.com/F3cdTBAcFQtEeEWEFXoMdq?mode=ems_copy_t',
            sourceUrl: 'https://chat.whatsapp.com/F3cdTBAcFQtEeEWEFXoMdq?mode=ems_copy_t',
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })

      await m.react('✔️')
    }

    // VIDEO
    else if (['play2', 'mp4'].includes(command)) {
      const video = await getVid(url)
      if (!video?.url) throw '⚠ No se pudo obtener el video.'

      await conn.sendFile(
        m.chat,
        video.url,
        `${title}.mp4`,
        `> ❑ *${title}*\n> Servidor: \`${video.api}\``,
        fkontak || m
      )
      await m.react('✔️')
    }

  } catch (e) {
    await m.react('✖️')
    return conn.reply(
      m.chat,
      typeof e === 'string'
        ? e
        : `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message || e}`,
      m
    )
  }
}

handler.command = handler.help = ['play', 'play2', 'playaudio', 'mp4']
handler.tags = ['descargas']
handler.group = true
export default handler

// === FUNCIONES ===

async function getAud(url) {
  const apis = [
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`, extractor: res => res.result?.download?.url },
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp3?url=${encodeURIComponent(url)}`, extractor: res => res.result?.dl },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.enlace },
    { api: 'Delirius', endpoint: `${global.APIs.delirius.url}/download/ymp3?url=${encodeURIComponent(url)}`, extractor: res => res.data?.download?.url },
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp3v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url }
  ]
  return await fetchPrioritizedApi(apis)
}

async function getVid(url) {
  const apis = [
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=380`, extractor: res => res.result?.download?.url },
    { api: 'Xyro', endpoint: `${global.APIs.xyro.url}/download/youtubemp4?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.dl },
    { api: 'Yupra', endpoint: `${global.APIs.yupra.url}/api/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.resultado?.formatos?.[0]?.url },
    { api: 'EliasarYT', endpoint: `https://api-nv.eliasaryt.pro/api/dl/yt-direct?url=${encodeURIComponent(url)}&type=video&key=hYSK8YrJpKRc9jSE`, extractor: res => res.data?.download?.url },
    { api: 'ZenzzXD', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4?url=${encodeURIComponent(url)}`, extractor: res => res.download_url },
    { api: 'ZenzzXD v2', endpoint: `${global.APIs.zenzxz.url}/downloader/ytmp4v2?url=${encodeURIComponent(url)}`, extractor: res => res.download_url }
  ]
  return await fetchPrioritizedApi(apis)
}

async function fetchPrioritizedApi(apis) {
  const prioritized = apis.filter(a => a.api === 'Vreden')
  const others = apis.filter(a => a.api !== 'Vreden').sort(() => Math.random() - 0.5)
  const finalList = [...prioritized, ...others]

  for (const { api, endpoint, extractor } of finalList) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
      clearTimeout(timeout)
      const link = extractor(res)
      if (link) return { url: link, api }
    } catch (err) {
    }
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