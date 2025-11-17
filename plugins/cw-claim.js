import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters[1].json'
const haremFilePath = './src/database/harem.json'

const cooldowns = {};

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8');
return JSON.parse(data);
} catch (error) {
throw new Error('📍 No se pudo cargar el archivo characters.json.');
}
}

async function saveCharacters(characters) {
try {
await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
} catch (error) {
throw new Error('📍 No se pudo guardar el archivo characters.json.');
}
}

let handler = async (m, { conn }) => {
const userId = m.sender;
const now = Date.now();

// Reaccionar al mensaje del usuario inmediatamente
await m.react("⏳");

if (cooldowns[userId] && now < cooldowns[userId]) {
const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
const minutes = Math.floor(remainingTime / 60);
const seconds = remainingTime % 60;
await conn.sendMessage(m.chat, { text: `📍  Debe esperar *${minutes} minutos y ${seconds} segundos para volver a usar el comando.` }, { quoted: m });

// Reacción de error por tiempo de espera
await conn.sendMessage(m.chat, { react: { text: '📍', key: m.key }});
return;
}

if (m.quoted && m.quoted.sender === conn.user.jid) {
try {
const characters = await loadCharacters();
const characterIdMatch = m.quoted.text.match(/🪪 ID: \*(.+?)\*/);

if (!characterIdMatch) {
await conn.sendMessage(m.chat, { text: `📍  Solicitud de ID no verificado.\n- No se ha podido entrar un personaje con esa ID.` }, { quoted: m });
// Reacción de error
await conn.sendMessage(m.chat, {
react: {
text: '📍',
key: m.key
}
});
return;
}

const characterId = characterIdMatch[1];
const character = characters.find(c => c.id === characterId);

if (!character) {
await conn.sendMessage(m.chat, { text: `📍  El mensaje citado no es un personaje.\n- Recuerde responder a un personaje con el comando *#cw*.` }, { quoted: m });
// Reacción de error
await conn.sendMessage(m.chat, { react: { text: '📍', key: m.key }});
return;
}

if (character.user && character.user !== userId) {
await conn.sendMessage(m.chat, { text: `📌  El usuario @${character.user.split('@')[0]} ya ha reclamado este personaje, intenta con otro.`, mentions: [character.user] }, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '📍', key: m.key }});
return;
}

character.user = userId;
character.status = "Reclamado";

await saveCharacters(characters);

await conn.sendMessage(m.chat, { text: `✅  Has reclamado al personaje ( *${character.name}* ) con exito.` }, { quoted: m });

// Reacción de éxito al mensaje del usuario
await conn.sendMessage(m.chat, { react: { text: '✅️', key: m.key }});

// Cooldown reducido de 30 minutos a 5 minutos
cooldowns[userId] = now + 5 * 60 * 1000;

} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m });
// Reacción de error por excepción

}

} else {
await conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a un personaje del comando *#cw* para reclamarlo.` }, { quoted: m });
// Reacción de error - no citó mensaje
}
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];

export default handler;