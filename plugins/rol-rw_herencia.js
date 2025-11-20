import { promises as fs } from 'fs';

const charactersFilePath = './src/database/personajes.json';
const confirmaciones = new Map();

async function loadCharacters() {
const data = await fs.readFile(charactersFilePath, 'utf-8');
return JSON.parse(data);
}

async function saveCharacters(characters) {
await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
}

let handler = async (m, { conn }) => {
const sender = m.sender;
const mentioned = m.mentionedJid?.[0];

if (!mentioned) return conn.reply(m.chat, `📍  Dedes mencionar a una persona para darle todos tus personajes.`, m);
if (mentioned === sender) return conn.reply(m.chat, `📍  No puedes darte tus propios personajes a ti mismo.\n- Menciona a una persona.`, m);

const characters = await loadCharacters();
const myWaifus = characters.filter(c => c.user === sender);

if (myWaifus.length === 0) return conn.reply(m.chat, `📍  No tienes personajes en tu *#harem* para darle a un usuario.\n- Usa *#rw* para reclamar tu primer personaje.`, m );

const valorTotal = myWaifus.reduce((acc, w) => acc + (parseInt(w.value) || 0), 0);

// Guardar solicitud en mapa para confirmar
confirmaciones.set(sender, {
waifus: myWaifus.map(c => c.id),
receptor: mentioned,
valorTotal
});

const textoConfirmacion = `〆  G I V E  :  H A R E M
\t𝇈 Hola @${sender.split('@')[0]}, ¿Estás seguro que deseas regalar todos tus personajes a @${mentioned.split('@')[0]}?

\t\t⚶ Personajes : *${myWaifus.length}* total.
\t\t⚶ Valor : *${valorTotal.toLocaleString()}* total.


\t𝇈 📍 Para confirmar responda a este mensaje con "si" para proceder.
• Recuerda que esta accion no puede cancelarse, piense bien para continuar.`;

await conn.sendMessage(m.chat, {
text: textoConfirmacion,
mentions: [sender, mentioned]
}, { quoted: m });
};

handler.before = async function (m, { conn }) {
const data = confirmaciones.get(m.sender);
if (!data) return;

if (m.text?.trim().toLowerCase() === 'si') {
confirmaciones.delete(m.sender);

const characters = await loadCharacters();
let regalados = 0;

for (const char of characters) {
if (data.waifus.includes(char.id) && char.user === m.sender) {
char.user = data.receptor;
char.status = "Reclamado";
regalados++;
}
}

await saveCharacters(characters);

return conn.sendMessage(m.chat, {
text: `✅  Has regalado con éxito todos tus personajes en tu harem.\n\n\t\t⚶ Receptor : @${data.receptor.split('@')[0]}\n\t\t⚶ Personajes : *${regalados}* en total.\n\t\t⚶ Valor : *${data.valorTotal.toLocaleString()}* en total`,
mentions: [data.receptor]
}, { quoted: m });
}
};

handler.help = ['herencia @user'];
handler.tags = ['gacha'];
handler.command = ['herencia', 'legacy'];
handler.group = true;

export default handler;
                                            
