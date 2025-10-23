import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) 
      return conn.reply(m.chat, `🌴 Por favor, ingresa el nombre o enlace del video.`, m, rcanal)

    await m.react('☃️')

    const videoMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})/)
    const query = videoMatch ? `https://youtu.be/${videoMatch[1]}` : text

    let result
    if (!videoMatch) {
      const search = await yts(query)
      const allItems = (search && (search.videos?.length ? search.videos : search.all)) || []
      result = allItems[0]
      if (!result) throw '⚠️ No se encontraron resultados.'
    } else {
      result = { url: query }
    }

    const infoData = await getVideoInfo(result.url)
    const info = ` 🕸️ *Título:* ${infoData.title}
 🎋 *Canal:* ${infoData.author?.name || 'Desconocido'}
 🍊 *Vistas:* ${formatViews(infoData.views)}
 🌿 *Duración:* ${infoData.timestamp || 'N/A'}
 ✨ *Publicado:* ${infoData.ago || 'N/A'}
 🍉 *Link:* ${infoData.url}`

    await conn.sendMessage(m.chat, {
      image: { url: infoData.thumbnail },
      caption: info, ...rcanal
    }, { quoted: m })

    if (['play', 'mp3'].includes(command)) {
      await m.react('🎧')

      const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(result.url)}&quality=128`
      const res = await fetch(apiUrl).then(r => r.json())
      if (!res?.status || !res.result?.download?.status) throw '❌ No se pudo obtener el audio.'

      const download = res.result.download

      await conn.sendMessage(
        m.chat,
        {
          audio: { url: download.url },
          mimetype: 'audio/mpeg',
          fileName: download.filename
        },
        { quoted: m }
      )
      await m.react('✔️')
    }


    else if (['play2', 'mp4'].includes(command)) {
      await m.react('🎬')

      const video = await getVid(result.url)
      if (!video?.url) throw '⚠️ No se pudo obtener el video.'

      await conn.sendMessage(
        m.chat,
        {
          video: { url: video.url },
          fileName: `${infoData.title}.mp4`,
          mimetype: 'video/mp4',
          caption: `🎥 *${infoData.title}*`
        },
        { quoted: m }
      )

      await m.react('✔️')
    }

  } catch (e) {
    await m.react('✖️')
    console.error(e)
    const msg = typeof e === 'string'
      ? e
      : `⚠️ Ocurrió un error inesperado.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e?.message || JSON.stringify(e)}`
    return conn.reply(m.chat, msg, m)
  }
}

handler.command = handler.help = ['play', 'play2', 'mp3', 'mp4']
handler.tags = ['download']
export default handler


async function getVid(url) {
  const apis = [
    {
      api: 'Yupra',
      endpoint: `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}`,
      extractor: res => res?.result?.formats?.[0]?.url || res?.result?.url
    }
  ]
  return await fetchFromApis(apis)
}

async function fetchFromApis(apis) {
  for (const { api, endpoint, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const r = await fetch(endpoint, { signal: controller.signal })
      clearTimeout(timeout)
      const res = await r.json().catch(() => null)
      const link = extractor(res)
      if (link) return { url: link, api }
    } catch (err) {
      console.log(`❌ Error en API ${api}:`, err?.message || err)
    }
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return null
}

async function getVideoInfo(url) {

  const search = await yts(url)
  const allItems = (search && (search.videos?.length ? search.videos : search.all)) || []
  return allItems.find(v => v.url === url) || allItems[0] || { title: 'Desconocido', views: 0, timestamp: 'N/A', ago: 'N/A', thumbnail: '', author: {}, url }
}

function formatViews(views) {
  if (views === undefined || views === null) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
  return views.toString()
}