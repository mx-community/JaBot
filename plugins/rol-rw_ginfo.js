import { promises as fs } from 'fs';

import { cooldowns as cooldowns } from '../plugins/roles-start.js';
import { cooldowns as cooldowns } from '../plugins/roles-claim.js';
//import { cooldowns as cooldowns, voteCooldownTime } from '../plugins/rol-rw_votos.js';

const charactersFilePath = './src/database/personajes.json';

function formatTime(ms) {
if (!ms || ms <= 0) return 'Ahora.';
const totalSeconds = Math.ceil(ms / 1000);
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
return `${minutes} minutos y ${seconds} segundos`;
}

let handler = async (m, { conn }) => {
const userId = m.sender;
const now = Date.now();
let userName;

try {
userName = await conn.getName(userId);
} catch {
userName = userId;
}

try {
const rwExpiration = rwCooldowns?.[userId] || 0;
const rwRemaining = rwExpiration - now;
const rwStatus = formatTime(rwRemaining);

const claimExpiration = claimCooldowns?.[userId] || 0;
const claimRemaining = claimExpiration - now;
const claimStatus = formatTime(claimRemaining);

let voteStatus = 'Ahora.';
if (voteCooldowns && typeof voteCooldowns.get === 'function') {
const lastVoteTime = voteCooldowns.get(userId);
if (lastVoteTime) {
const voteExpiration = lastVoteTime + (voteCooldownTime || 0);
const voteRemaining = voteExpiration - now;
voteStatus = formatTime(voteRemaining);
}
}

let allCharacters = [];
try {
const data = await fs.readFile(charactersFilePath, 'utf-8');
allCharacters = JSON.parse(data);
} catch (e) {
console.error('📍 Error leyendo characters.json:', e.message);
return conn.reply(m.chat, '📍  Hubo un error al cargar los archivos correspondientes.\n- Si el error persiste, reporta el comando con *#support*.', m);
}

const userCharacters = allCharacters.filter(c => c.user === userId);
const claimedCount = userCharacters.length;
const totalCharacters = allCharacters.length;

const totalValue = userCharacters.reduce((sum, char) => {
return sum + (Number(char.value) || 0);
}, 0);

let response = `〆  I N F O  :  G A C H A\n𝇈 📍 \`\`\`Informacion del usuario.\`\`\`\n\n\t🜲 *Usuario:* ${userName}\n\n`;
response += `\t\t⏰ *RW :* ${rwStatus}\n`;
response += `\t\t⏰ *CLAIM :* ${claimStatus}\n`;
response += `\t\t📥 *VOTE :* ${voteStatus}\n\n`;
response += `⚶ Reclamados : *${claimedCount} de ${totalCharacters}*\n`;
response += `⚶ Valor total : *${totalValue.toLocaleString('es-ES')}*\n\n\n> ${textbot}`;

await conn.reply(m.chat, response, m);

} catch (e) {
console.error('📍 Error en handler ginfo:', e);
await conn.reply(m.chat, `📍 ${e}`, m);
}
};

handler.help = ['estado', 'status', 'cooldowns', 'cd'];
handler.tags = ['info'];
handler.command = ['infogacha', 'ginfo', 'gachainfo'];
handler.group = true;

export default handler;
  
