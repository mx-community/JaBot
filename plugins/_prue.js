import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

let handler = async (m, { conn }) => {
  // Detectar link de YouTube
  const youtubeRegex = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i;
  const match = m.text?.match(youtubeRegex);
  if (!match) return; // No es link de YouTube

  const url = match[0];

  // Reacción mientras procesa
  await m.react('⏳');

  // Buscar video
  const result = await yts(url);
  if (!result?.videos?.length) return conn.reply(m.chat, '⚠️ No se encontró el video.', m);

  const video = result.videos[0];

  // Preparar miniatura
  const media = await prepareWAMessageMedia(
    { image: { url: video.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  // Mensaje interactivo
  const interactiveMessage = {
    body: {
      text: `╭━━❰ 乂 YOUTUBE LINK 乂 ❱━━╮
🎬 *TÍTULO:* ${video.title}
🌵 *AUTOR:* ${video.author.name}
🍁 *VISTAS:* ${video.views.toLocaleString()}
🌿 *DURACIÓN:* ${video.timestamp}
🔗 *LINK:* ${video.url}
╰━━━━━━━━━━━━━━━╯`
    },
    footer: { text: 'Dev: neveloopp' },
    header: {
      title: '┏━❰ 乂 YOUTUBE 乂 ❱━┓',
      hasMediaAttachment: true,
      imageMessage: media.imageMessage
    },
    nativeFlowMessage: {
      buttons: [
        {
          type: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Opciones de descarga',
            sections: [
              {
                title: video.title,
                rows: [
                  { header: video.title, title: '🎧 Descargar Audio', description: `Duración: ${video.timestamp}`, id: `.ytmp3 ${video.url}` },
                  { header: video.title, title: '📹 Descargar Video', description: `Duración: ${video.timestamp}`, id: `.ytmp4 ${video.url}` },
                  { header: video.title, title: '⭐ Favorito', description: 'Agregar a favoritos', id: `.favorito ${video.url}` },
                  { header: video.title, title: '🔄 Compartir', description: 'Compartir video', id: `.share ${video.url}` }
                ]
              }
            ]
          })
        },
        {
          type: 'ct_url',
          buttonParamsJson: JSON.stringify({
            title: 'Ver en YouTube',
            url: video.url
          })
        }
      ],
      messageParamsJson: ''
    }
  };

  const userJid = conn?.user?.jid || m.key.participant || m.chat;
  const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid, quoted: m });
  conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  // Reacción de éxito
  await m.react('✅');
};

// Configuración tipo TikTok handler
handler.customPrefix = /https?:\/\/(?:www\.|youtu\.be\/|youtube\.com\/watch\?v=)[^\s]+/i;
handler.command = new RegExp();
handler.all = true;

export default handler;