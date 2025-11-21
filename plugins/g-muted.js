import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
try {
if (!isAdmin) return conn.sendMessage(m.chat, { text: `📍  Solo los administradores pueden usar este comando.` }, { quoted: m });
const ownerId = (global.owner && global.owner[0] && global.owner[0][0]) ? `${global.owner[0][0]}@s.whatsapp.net` : null;

let target = m.mentionedJid?.[0] || m.quoted?.sender || text || '';
target = typeof target === 'object' ? (target[0] || '') : target;

if (target && !target.includes('@')) target = target.replace(/\D/g, '') + '@s.whatsapp.net';
if (!target) return conn.reply(m.chat, `Ingrese el comando y mencione o responda a un participante para eliminar sus mensajes al hablar.`, m);

if (ownerId && target === ownerId) return conn.reply(m.chat, `📌  No puedes usar este comando contra el propietario del bot.`, m);
if (target === conn.user?.jid) return conn.reply(m.chat, `📍  No puedes usar este comando conmigo mismo, mensiona a un participante.`, m);

if (!global.db) global.db = { data: { users: {} } };
if (!global.db.data) global.db.data = { users: {} };
if (!global.db.data.users) global.db.data.users = {};
if (!global.db.data.users[target]) global.db.data.users[target] = { mute: false };

const userData = global.db.data.users[target];

if (command === 'mute') {
if (userData.mute === true) return conn.sendMessage(m.chat, { text: `📌  Este usuario ya ha sido muteado.\n\n- Usa *#unmute* para desactivar esta función.` }, { quoted: m });

const thumbnail = await (await fetch(`${global.mMages}`)).buffer();
const quotedMsg = {
key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'mute-id' },
message: {
locationMessage: {
name: 'T O R U  :  M U T E',
jpegThumbnail: thumbnail,
vcard: [
'BEGIN:VCARD',
'VERSION:3.0',
'N:;Unlimited;;;',
'FN:Unlimited',
'ORG:Unlimited',
'item1.TEL;waid=5493873655135:+54 9 3873 65-5135',
'item1.X-ABLabel:Unlimited',
'X-WA-BIZ-DESCRIPTION:ofc',
'X-WA-BIZ-NAME:Unlimited',
'END:VCARD'
].join('\n')
}
},
participant: '0@s.whatsapp.net'
};

userData.mute = true;
await conn.reply(m.chat, '〆  M U T E  :  O N\n\n\t⸭ ✅ ```Usuario muteado correctamente, se eliminaran sus mensajes.```', quotedMsg, null, { mentions: [target] });
return;
}

if (command === 'unmute') {
if (userData.mute === false) return conn.sendMessage(m.chat, { text: `📌  Este usuario no ha sido muteado.\n\n- Usa *#mute* para activar la función.` }, { quoted: m });

const thumbnail = await (await fetch(`${global.mMages}`)).buffer();
const quotedMsg = {
key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'unmute-id' },
message: {
locationMessage: {
name: 'T O R U  :  U N M U T E',
jpegThumbnail: thumbnail,
vcard: [
'BEGIN:VCARD',
'VERSION:3.0',
'N:;Unlimited;;;',
'FN:Unlimited',
'ORG:Unlimited',
'item1.TEL;waid=5493873655135:+54 9 3873 65-5135',
'item1.X-ABLabel:Unlimited',
'X-WA-BIZ-DESCRIPTION:ofc',
'X-WA-BIZ-NAME:Unlimited',
'END:VCARD'
].join('\n')
}
},
participant: '0@s.whatsapp.net'
};

userData.mute = false;
await conn.reply(m.chat, '〆  M U T E  :  O F F\n\n\t⸭ ✅ ```Usuario desmuteado, ahora sus mensajes permanecen.```', quotedMsg, null, { mentions: [target] });
return;
}

return conn.reply(m.chat, '📍  Comando no reconocido.', m);

} catch (err) {
const e = typeof err === 'string' ? err : (err?.message || String(err));
try { await conn.reply(m.chat, `馃尶 Error: ${e}`, m); } catch (__) { }
}
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;


handler.before = async (m, { conn, isAdmin, isBotAdmin }) => {
try {
if (!m.isGroup) return;
if (!global.db?.data?.users[m.sender]) return;
if (!global.db.data.users[m.sender].mute) return;
if (!isBotAdmin) return;
if (isAdmin) return;

await conn.sendMessage(m.chat, { delete: m.key });
} catch {}
};

export default handler;
