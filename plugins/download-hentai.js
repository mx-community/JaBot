import fetch from "node-fetch"
import cheerio from "cheerio"
import { JSDOM } from "jsdom"

let handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `
🌸 *Uso correcto del comando:*
> ✨ Ejemplo:  *.hent* Boku ni Harem Sexfriend
`, m)
    }

    await m.react('🕒')

    // Si el usuario envía un enlace directo de VeoHentai
    if (text.includes('https://veohentai.com/ver/')) {
      const videoInfo = await getInfo(text)
      if (!videoInfo) return conn.reply(m.chat, '❌ No se encontró información del video.', m)

      const peso = await size(videoInfo.videoUrl)

      let caption = `〔 🍃 𝗩𝗲𝗼𝗛𝗲𝗻𝘁𝗮𝗶 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 🍃 〕

🎬 *Título:* ${videoInfo.title}
👀 *Vistas:* ${videoInfo.views}
💖 *Likes:* ${videoInfo.likes}
💢 *Dislikes:* ${videoInfo.dislikes}
📦 *Tamaño:* ${peso}
🔗 *Link:* ${text}

⚡ _Descargando el archivo, espera un momento..._
`

      await conn.reply(m.chat, caption, m)

      await conn.sendFile(m.chat, videoInfo.videoUrl, `${videoInfo.title}.mp4`, '', m, null, {
        asDocument: true,
        mimetype: "video/mp4"
      })

      await m.react('✅')
    } else {
      const results = await searchHentai(text)
      if (results.length === 0)
        return conn.reply(m.chat, '😿 No se encontraron resultados.', m)

      let caption = `
   ⬣〔 🌺 𝗛𝗲𝗻𝘁𝗮𝗶 𝗥𝗲𝘀𝘂𝗹𝘁𝘀 🌺 〕
 🔞 *Término buscado:* ${text}


🎥 *Resultados encontrados:* ${results.length}
`.trim()

      results.slice(0, 15).forEach((res, i) => {
        caption += `

${i + 1}. 🌸 *Título:* ${res.titulo}
🔗 *Link:* ${res.url}`
      })

      caption += `

🍃 *Tip:* Puedes copiar el link y usar:
> *.hent* <link>
para descargar el video directamente. 💦
`

      await conn.reply(m.chat, caption, m)
      await m.react("🔞")
    }
  } catch (err) {
    console.error(err)
    return conn.reply(m.chat, '⚠️ Error interno del comando.\n\n' + err.message, m)
  }
}

handler.help = ["hentai"]
handler.tags = ["download"]
handler.command = ["hentai", "hent"]
handler.group = true
handler.premium = true

export default handler


async function searchHentai(text) {
  const base = `https://veohentai.com/?s=${encodeURIComponent(text)}`
  try {
    const response = await fetch(base)
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`)

    const html = await response.text()
    const $ = cheerio.load(html)
    const resultados = []

    $(".grid a").each((i, el) => {
      const url = $(el).attr("href")
      const titulo = $(el).find("h2").text().trim()
      if (url && titulo) resultados.push({ titulo, url })
    })

    return resultados
  } catch (error) {
    console.error("Error en búsqueda:", error)
    return []
  }
}


async function getInfo(url) {
  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    const data = await response.text()
    const dom = new JSDOM(data)
    const document = dom.window.document

    const iframe = document.querySelector(".aspect-w-16.aspect-h-9 iframe")
    if (!iframe) return null

    const iframeSrc = iframe.src
    const videoResponse = await fetch(iframeSrc)
    const videoHtml = await videoResponse.text()

    const match = videoHtml.match(/data-id="\/player\.php\?u=([^&]*)/)
    if (!match) throw new Error("No se encontró el video.")

    const videoUrl = atob(match[1])
    const title = document.querySelector("h1.text-whitegray.text-lg")?.textContent.trim() || "Sin título"
    const views = document.querySelector("h4.text-whitelite.text-sm")?.textContent.trim() || "N/A"
    const likes = document.querySelector("#num-like")?.textContent.trim() || "0"
    const dislikes = document.querySelector("#num-dislike")?.textContent.trim() || "0"

    return { videoUrl, title, views, likes, dislikes }
  } catch (error) {
    console.error("Error al obtener info:", error)
    return null
  }
}

async function size(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    const size = parseInt(res.headers.get('content-length'), 10)
    if (!size) return 'No disponible'

    if (size >= 1e9) return (size / 1e9).toFixed(2) + ' GB'
    if (size >= 1e6) return (size / 1e6).toFixed(2) + ' MB'
    if (size >= 1e3) return (size / 1e3).toFixed(2) + ' KB'
    return size + ' Bytes'
  } catch (err) {
    return 'Error: ' + err.message
  }
}