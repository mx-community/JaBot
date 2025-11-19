import fetch from 'node-fetch'
const handler = async (m, { conn, usedPrefix, command, args, text}) => {
let fotoGay = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoBlur = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoHorny = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoStupid = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoDog = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoSimp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoYtc = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoLoli = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
let fotoMaker = 'https://i.imgur.com/whjlJSf.jpg';
let fotoMaker2 = 'https://i.imgur.com/whjlJSf.jpg';

const thumb = Buffer.from(await (await fetch(`https://qu.ax/OJdvp.jpg`)).arrayBuffer())
let who = await m.mentionedJid && await await m.mentionedJid[0] ? await await m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let who2 = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
let ftPp = await conn.profilePictureUrl(who, 'image').catch(_ => fotoMaker );
let yoXd = await conn.profilePictureUrl(m.sender, 'image').catch(_ => fotoMaker2 );

let filtros = `〆  M A K E R  :  F I L T E R S
\t𝇈 📍 \`\`\`Filtros de edición.\`\`\`

\t\t々 *${usedPrefix}gay* (@mention)
\t々 *${usedPrefix}blur* (@mention)
\t\t々 *${usedPrefix}horny* (@mention)
\t々 *${usedPrefix}dog* (text)
\t\t々 *${usedPrefix}pixel* (@mention)
\t々 *${usedPrefix}ytc* (text)
\t\t々 *${usedPrefix}lolice* (@mention)
\t々 *${usedPrefix}trash* (@mention)
\t\t々 *${usedPrefix}simp* (@mention)
\t々 *${usedPrefix}rip* (@mention)
\t\t々 *${usedPrefix}shit* (@mention)
\t々 *${usedPrefix}spank* (@mention)
\t\t々 *${usedPrefix}gdel* (@mention)
\t々 *${usedPrefix}bea* (@mention)
\t\t々 *${usedPrefix}text* (text)


> ${textbot}`

if (command === "maker") {
await conn.sendMessage(m.chat, { text: filtros, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  M A K E R  :  F I L T E R S  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

//conn.sendMessage(m.chat, { text: filtros }, { quoted: m })
} 

if ( command === 'gay' || command === 'homo') {
await conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {
avatar: await conn.profilePictureUrl(who || who2, 'image').catch((_) => fotoGay ),
}), 'mx-community.png', `🏳️‍🌈 Gay 🏳️‍🌈`, m);
}

if (command === 'blur') {
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/blur', {
avatar: await conn.profilePictureUrl(who || who2, 'image').catch((_) => fotoBlur ),
}), 'mx-community.png', '🖼️  Imagen difuminado.', m);
}

if (command === 'card' || command === 'horny') {
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/horny', {
avatar: await conn.profilePictureUrl(who, 'image').catch((_) => fotoHorny ),
}), 'mx-community.png', '🔥  Certificado de calentamiento corporal', m);
}

if (command === 'dog') {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba un texto.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola` }, { quoted: m });
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/its-so-stupid', {
avatar: await conn.profilePictureUrl(who || who2, 'image').catch((_) => fotoStupid ),
dog: text || 'im+stupid',
}), 'mx-community.png', `👍🏻`, m);
}

if (command === 'pixel' || command === 'pixelar') {
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/pixelate', {
avatar: await conn.profilePictureUrl(m.sender || who2, 'image').catch((_) => fotoDog ),
comment: text,
username: conn.getName(m.sender),
}), 'mx-community.png', '🖼️  Imagen pixelada.', m);
}

if (command === 'simp') {
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/simpcard', {
avatar: await conn.profilePictureUrl(who || who2, 'image').catch((_) => fotoSimp ),
}), 'mx-community.png', '🔥 Muy simp', m);
}

if (command === 'ytc') {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba un texto.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola a todos.` }, { quoted: m });
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/youtube-comment', {
avatar: await conn.profilePictureUrl(m.sender || who2, 'image').catch((_) => fotoYtc ),
comment: text,
username: conn.getName(m.sender),
}), 'mx-community.png', '💬 Tu comentario en YouTube.', m);
}

if (command === 'lolice') {
conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/lolice', {
avatar: await conn.profilePictureUrl(who || who2, 'image').catch((_) => fotoLoli ),
}), 'mx-community.png', '⛩️ Loli Fiscal.', m);
}

if (command === 'basura' || args[0] === 'trash') {
let trash = global.API('fgmods', '/api/maker/trash', { url: ftPp }, 'apikey')
conn.sendFile(m.chat, trash, 'mx-community.png', `🚯  Basura`, m);
}

if (command === 'rip') {
let rip = global.API('fgmods', '/api/maker/rip', { url: ftPp }, 'apikey')
conn.sendFile(m.chat, rip, 'mx-community.png', `🪦  RIP`, m);
}

if (command === 'shit') {
let shit = global.API('fgmods', '/api/maker/shit', { url: ftPp }, 'apikey')
conn.sendFile(m.chat, shit, 'mx-community.png', `💪🏻  Shit`, m);
} else if (args[0] === 'azotar' || args[0] === 'spank') {
if (!who2) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y mensione a una persona.\n\n• *Por ejemplo:*\n${usedPrefix + command} @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m });
let az = global.API('fgmods', '/api/maker/spank', { url: yoXd, url2: ftPp }, 'apikey')
let messs = `😨  @${m.sender.split('@')[0]} esta azotando a @${who2.split('@')[0]}`
conn.sendMessage(m.chat, { image: { url: az }, caption: messs, mentions: await conn.parseMention(messs) }, { quoted: m });
}

if (command === 'gdel' || command === 'deletex') {
let del = global.API('fgmods', '/api/maker/delete', { url: ftPp }, 'apikey')
conn.sendFile(m.chat, del, 'mx-community.png', `Jajaja`, m);
}

if (command === 'bea') {
let bea = global.API('fgmods', '/api/maker/beautiful', { url: ftPp }, 'apikey')
conn.sendFile(m.chat, bea, 'mx-community.png', `🤩`, m);
}

if (command === 'text') {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba un texto.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola a todos.` }, { quoted: m });
let contextos = global.API('fgmods', '/api/maker/txt', { text: text }, 'apikey')
conn.sendFile(m.chat, contextos, 'mx-community.png', `Aqui esta lo que escribiste.`, m)
 }
}
handler.help = ['mks'];
handler.tags = ['maker'];
handler.command = ["maker", "gay", "homo", "blur", "card", "horny", "dog", "pixel", "pixelar", "simp", "ytc", "lolice", "basura", "trash", "rip", "shit", "gdel", "deletex", "bea", "text"];
handler.group = true;
export default handler;
	
