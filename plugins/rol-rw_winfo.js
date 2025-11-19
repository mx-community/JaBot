import { promises as fs } from 'fs';

const charactersFilePath = './src/database/personajes.json';
const haremFilePath = './src/database/reclamados.json';

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8');
return JSON.parse(data);
} catch (error) {
throw new Error('📍  No se pudo cargar el archivo characters.json.');
}
}

async function loadHarem() {
try {
const data = await fs.readFile(haremFilePath, 'utf-8');
return JSON.parse(data);
} catch (error) {
return [];
}
}

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (args.length === 0) {
await conn.reply(m.chat, `📍  Debe de ingresar el nombre del personaje para ver su informacion.\n\n• Por ejemplo:\n*#${command}* Takeda Harumi`, m);
return;
}

const characterName = args.join(' ').toLowerCase().trim();

try {
const characters = await loadCharacters();
const character = characters.find(c => c.name.toLowerCase() === characterName);

if (!character) {
await conn.reply(m.chat, `📍  El personaje ( *${characterName}* ) no existe o está mal escrito.\n- Revise en el comando *#torw* para verificar su existencia.`, m);
return;
}

const harem = await loadHarem();
const userEntry = harem.find(entry => entry.characterId === character.id);
const statusMessage = userEntry 
? `Reclamado por @${userEntry.userId.split('@')[0]} 📌` 
: 'Libre para reclamar. ✅';

const message = `〆  P E R S O N A J E
\t𝇈 📍 \`\`\`Informacion del personaje.\`\`\`

> ${statusMessage}

\t\t⚶ *Nombre:* ${character.name}
\t\t⚶ *Genero:* ${character.gender}
\t\t⚶ *Valor:* ${character.value}
\t\t⚶ *Rango:* ${character.source}

💾 ID: *${character.id}*


> ${textbot}`;

await conn.reply(m.chat, message, m, { mentions: [userEntry ? userEntry.userId : null] });
} catch (error) {
await conn.reply(m.chat, `📍 ${error.message}`, m);
}
};

handler.help = ['charinfo <nombre del personaje>', 'winfo <nombre del personaje>', 'waifuinfo <nombre del personaje>'];
handler.tags = ['anime'];
handler.command = ['charinfo', 'winfo', 'waifuinfo'];
handler.group = true;

export default handler;

  
