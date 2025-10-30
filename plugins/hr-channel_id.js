const handler = async (m, { text, conn, usedPrefix, command }) => {
try {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un canal de WhatsApp para sacar la ID.\n\n• Por ejemplo:\n*#${command}* https://whatsapp.com/channel/ejemplo_de_canal` }, { quoted: m });
await m.react("⏳");

const regex = /https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9-_]+)/;
const match = text.match(regex);

if (!match) return conn.sendMessage(m.chat, { text: `📍  El enlace proporcionado no es valido, recuerde copiar un enlace del canal de WhatsApp para sacar su ID.` }, { quoted: m });

let channelId = match[2];
let res = await conn.newsletterMetadata("invite", channelId);

if (!res || !res.id) return conn.sendMessage(m.chat, { text: `📍  No se ha podido obtener datos del canal, intentalo de nuevo.` }, { quoted: m });

let chMdmx = `🝐✦  *CHANNEL : INFO*

❒ *Nombre:* ${res.name}
❒ *Seguidores:* ${res.subscribers.toLocaleString()}
❒ *Verifify:* ${res.verification === "VERIFIED" ? "Si." : "No."}
❒ *ID:* ${res.id}`;
return conn.sendMessage(m.chat, { text: chMdmx }, { quoted: m });
} catch (error) {
console.error(error);
return conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.command = ["cid", "idc"];
export default handler;

/* 
Comando para poder sacar la id de un canal de WhatsApp.
Por el momento en face beta, se estima mejoras superiores a este proximamente.
 */
  
