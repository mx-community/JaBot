import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim())
      return conn.reply(m.chat, `🌴 Por favor, ingresa el nombre o enlace del video.`, m, rcanal)

    await m.react('☃️')

    const videoMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? `https://youtu.be/${videoMatch[1]}` : text

    const search = await yts(query)
    const result = videoMatch
      ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0]
      : search.all[0]

    if (!result) throw '⚠️ No se encontraron resultados.'

    const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
    if (seconds > 600) throw '⚠ El video supera el límite de duración (10 minutos).'

    const vistas = formatViews(views)
    const info = `「✦」Descargando *<${title}>*\n
> ❑ Canal » *${author.name}*
> ♡ Vistas » *${vistas}*
> ✧︎ Duración » *${timestamp}*
> ☁︎ Publicado » *${ago}*
> ➪ Link » ${url}`

    const thumb = (await conn.getFile(thumbnail)).data
    await conn.sendMessage(m.chat, { image: thumb, caption: info, ...rcanal }, { quoted: fkontak })

    if (['play', 'mp3'].includes(command)) {
      const audio = await getAud(url)
      if (!audio?.url) throw '⚠ No se pudo obtener el audio.'
      await conn.sendMessage(
        m.chat,
        {
          audio: { url: audio.url },
          fileName: `${title}.mp3`,
          mimetype: 'audio/mpeg',
          contextInfo: {
            externalAdReply: {
              title: title,
              body: '',
              thumbnailUrl: thumbnail,
              sourceUrl: url,
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        },
        { quoted: m }
      )
      await m.react('✔️')
    }

    else if (['play2', 'mp4'].includes(command)) {
      const video = await getVid(url)
      if (!video?.url) throw '⚠ No se pudo obtener el video.'
      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.url },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: `⭐ *${title}*`,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: '🎬 Video descargado correctamente',
              thumbnailUrl: thumbnail,
              sourceUrl: url,
              mediaType: 1,
              renderLargerThumbnail: false
            }
          }
        },
        { quoted: m }
      )
      await m.react('✔️')
    }

  } catch (e) {
    await m.react('✖️')
    console.error(e)
    return conn.reply(
      m.chat,
      typeof e === 'string'
        ? e
        : '⚠︎ Ocurrió un error inesperado.\n> Usa *' + usedPrefix + 'report* para informarlo.\n\n' + e.message,
      m
    )
  }
}

handler.command = handler.help = ['play', 'play2', 'mp3', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler

async function getAud(url) {
  const apis = [
    {
      api: 'Vreden',
      endpoint: `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`,
      extractor: res => res.result?.download?.url
    }
  ]
  return await fetchFromApis(apis)
}

async function getVid(url) {
  const apis = [
    {
      api: 'ZenzzXD',
      endpoint: `https://api.zenzxz.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}&resolution=360p`,
      extractor: res => res.data?.download_url
    }
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
      if (link) return { url: link, api }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return null
}

// 🔹 Formato de vistas bonito
function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}