//código creado por Dioneibi-rip
import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎥';


  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} *Oh senpai~* pásame un link de YouTube para traerte el videito.\n\nEjemplo de uso:\n*${usedPrefix + command} https://youtu.be/3vWtHIA2b7c*`,
      m,
      { quoted: m }
    );
  }

  try {
    await conn.reply(
      m.chat,
      `🌺 *E S P E R E*\n- 🍃 Se está descargando su video, dame un momentito >w<`,
      m,
      { quoted: m }
    );

    const url = args[0];
    const api = `https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.result?.download?.url) {
      return conn.reply(
        m.chat,
        `❌ *No pude descargar el video.*\nRazón: ${json.message || 'Respuesta inválida.'}`,
        m,
        { quoted: m }
      );
    }

    const {
      title,
      description,
      timestamp,
      views,
      image,
      author,
      url: videoURL
    } = json.result.metadata;

    const {
      url: downloadURL,
      quality,
      filename
    } = json.result.download;

    const videoRes = await fetch(downloadURL);
    const videoBuffer = await videoRes.buffer();

    await conn.sendMessage(
      m.chat,
      {
        video: videoBuffer,
        caption: 
`╭━━━━[ 𝚈𝚃𝙼𝙿𝟺 𝙳𝚎𝚌𝚘𝚍𝚎𝚍 ]━━━━⬣
📹 *Título:* ${title}
🧑‍💻 *Autor:* ${author?.name || 'Desconocido'}
🕒 *Duración:* ${timestamp}
📅 *Publicado:* ${json.result.metadata.ago}
👁️ *Vistas:* ${views.toLocaleString()}
🎞️ *Calidad:* ${quality}
📄 *Descripción:*
${description}
╰━━━━━━━━━━━━━━━━━━⬣`,
        mimetype: 'video/mp4',
        fileName: filename
      },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    await conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el video.*\nDetalles: ${e.message}`,
      m,
      { quoted: m }
    );
  }
};

handler.help = ['ytmp4'].map(v => v + ' <enlace>');
handler.tags = ['descargas'];
handler.command = ['ytmpp', 'ytvideo', 'ytmp4dl'];

export default handler;
      
