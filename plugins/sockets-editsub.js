import fetch from 'node-fetch';
import Jimp from 'jimp';

const handler = async (m, { conn, isRowner command, usedPrefix, text }) => {
const isSubBots = [conn.user.jid, ...global.owner.map(([number]) => `${number}@s.whatsapp.net`)].includes(m.sender);
if (!isSubBots) return conn.sendMessage(m.chat, { text: `📍  Este comando solo puede ser utilizado por un servidor.\n- Aqui un servidor usando *#newserver*` }, { quoted: m });

//Imagen del bot.
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer());

//Tipo de cambios disponibles.
const newName = m.text.trim().split(' ').slice(1).join(' ');
const newDesc = m.text.trim().split(' ').slice(1).join(' ');
const newPage = m.text.trim().split(' ').slice(1).join(' ');
const newGroup = m.text.trim().split(' ').slice(1).join(' ');
const newChannel = m.text.trim().split(' ').slice(1).join(' ');

//Listado total.
let responseMessage = `⫶☰ Lista de edición para tu servidor.
- Para editar tu servidor debes ver los términos y condiciones aparte.

⫶☰ \`Edición basica:\`
❒  *#s-name*  :  <text>
> ⤷ _Edita el nombre del bot visible en chats._ ( *${global.botname}* )
❒  *#s-desc*  :  <text>
> ⤷ _Edita la descripción del bot visible en chats._
❒  *#s-web*  :  <text>
> ⤷ _Edita la pagina web, sea red social o otro._
❒  *#s-group*  :  <text>
> ⤷ _Edita el enlace grupal del bot a tu enlace grupal._
❒  *#s-channel*  :  <text>
> ⤷ _Edita el link directo del canal en el bot a tu enlace._

⫶☰ \`Edición de imagenes:\`
❒  *#s-menu*  :  <text>
> ⤷ _Edita la foto del menu en el bot._
❒  *#s-img*  :  <text>
> ⤷ _Edita la imagen del bot._

⫶☰ \`Edición de recursos:\`
❒  *#s-coin*  :  <text>
> ⤷ _Edita el nombre del recurso._ ( *${global.currency}* )
❒  *#s-coin2*  :  <text>
> ⤷ _Edita el nombre del segundo recurso._ ( *${global.currency2}* )`;
let messageTitle = `Listado completo.`;
let messageFooter = `⫶☰  Lista de edición para el servidor alquilado.`;

try {
switch (command) {
//Inicio del comando.
case "s-bot": {
await conn.sendMessage(m.chat, { text: responseMessage.trim(), mentions: [m.sender], contextInfo: { externalAdReply: { 
title: messageTitle, 
body: messageFooter, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
break
};

//Cambio de nombre (visible en menus o otros distintos puntos.)
case "s-name": {
if (!newName) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nuevo nombre del bot.\n\n⊹ ✎ *Nombre actual:* ${global.botname}\n\n• Por ejemplo:\n*${usedPrefix + command}* MxBot` }, { quoted: m });
};
global.botname = newName;
let exito = `✅  Se ha cambiado el nombre del bot con exito a ( *${newName}* ).`;
await conn.sendMessage(m.chat, { text: exito.trim() }, { quoted: m });
break
};

//Cambio de descripción (Info inferior)
case "s-desc": {
if (!newDesc) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la nueva descripción del bot.\n\n⊹ ✎ *Descripción actual:*\n${global.textbot}\n\n• Por ejemplo:\n*${usedPrefix + command}* Bot estable para WhatsApp.` }, { quoted: m });
};
global.textbot = newDesc;
let exito = `✅  Se ha cambiado la descripción del bot con exito a ( *${newDesc}* ).`;
await conn.sendMessage(m.chat, { text: exito.trim() }, { quoted: m });
break
};

//Cambio de enlace (pagina o web)
case "s-web": {
if (!newPage) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de su red social o pagina web para aplicarlo al bot.\n\n⊹ ✎ *Pagina/Web actual:*\n${global.botweb}\n\n• Por ejemplo:\n*${usedPrefix + command}* https://mipaginaweb.ejemplo` }, { quoted: m });
};
global.botweb = newPage;
let exito = `✅  Se ha cambiado la pagina/web del bot con exito a ( *${newPage}* ).`;
await conn.sendMessage(m.chat, { text: exito.trim() }, { quoted: m });
break
};

//Cambio del enlace grupal (establece un enlace grupal para el bot.)
case "s-group": {
if (!newGroup) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de su chat grupal o comunidad para aplicarlo al bot.\n\n⊹ ✎ *Grupo actual:*\n${global.botgroup}\n\n• Por ejemplo:\n*${usedPrefix + command}* https://migrupo.ejemplo` }, { quoted: m });
};
global.botgroup = newGroup;
let exito = `✅  Se ha cambiado el enlace grupal del bot con exito a ( *${newGroup}* ).`;
await conn.sendMessage(m.chat, { text: exito.trim() }, { quoted: m });
break
};

//Establece un canal para el bot, es decir, poder cambiar el canal a preferencia.
case "s-channel": {
if (!newChannel) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de su canal de WhatsApp, Telegram o otra red para establecerlo al bot.\n\n⊹ ✎ *Canal actual:*\n${global.botcanal}\n\n• Por ejemplo:\n*${usedPrefix + command}* https://channel.ejemplo` }, { quoted: m });
};
global.botcanal = newChannel;
let exito = `✅  Se ha cambiado el canal del bot con exito a ( *${newChannel}* ).`;
await conn.sendMessage(m.chat, { text: exito.trim() }, { quoted: m });
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}

handler.help = ['s-name', 's-desc', 's-web', 's-group', 's-channel', 's-bot'];
handler.tags = ['servidor'];
handler.command = ['s-name', 's-desc', 's-web', 's-group', 's-channel', 's-bot'];

export default handler;

