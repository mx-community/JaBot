let handler = async (m, { conn, isRowner, usedPrefix, command }) => {

if (command === "b-name") {
const newName = m.text.trim().split(' ').slice(1).join(' ');
if (!newName) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nuevo nombre del bot.\n\n• Por ejemplo:\n*${usedPrefix + command}* MX BOT` }, { quoted: m });
};
global.botname = newName;
conn.sendMessage(m.chat, { text: `✓  Se ha cambiado el nombre del bot a ( *${newName}* ) con exito.` }, { quoted: m });
};

if (command === "b-desc") {
const newDesc = m.text.trim().split(' ').slice(1).join(' ');
if (!newDesc) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nuevo nombre del bot.\n\n• Por ejemplo:\n*${usedPrefix + command}* MX BOT` }, { quoted: m });
};
global.textbot = newDesc;
conn.sendMessage(m.chat, { text: `✓  Se ha cambiado el nombre del bot a ( *${newDesc}* ) con exito.` }, { quoted: m });
};
};

handler.help = ['b-name  <text>', 'b-desc  <text>'];
handler.tags = ['Edicion'];
handler.command = ['b-name', 'b-desc']; 
handler.owner = true

export default handler;


