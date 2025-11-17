import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
const user = global.db.data.users[m.sender]
let categoriasXd = `📍  Listado de modificaciones para tu perfil.
- Personaliza tu *#perfil* facil y seguro.

⫶☰ \`Lista Disponible:\`
❒ *#p-cumple*  <text>
> ╰✎ _Establecer fecha de nacimiento._
❒ *#d-cumple*  
> ╰✎ _Eliminar la fecha de nacimiento._
❒ *#p-genero*  <text>
> ╰✎ _Establecer genero del usuario._
❒ *#d-genero*  
> ╰✎ _Eliminar el genero del usuario._
❒ *#p-desc*  <text>
> ╰✎ _Establecer descripción corta._
❒ *#d-desc*  
> ╰✎ _Eliminar descripción corta._
`
if (command === 'pf') {
return conn.sendMessage(m.chat, { text: categoriasXd }, { quoted: m })
}
switch (command) {
case 'p-cumple': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su fecha de nacimiento.\n\n• Por ejemplo:\n*${usedPrefix + command}* 03/03/2000` }, { quoted: m })
function validarFechaNacimiento(text) {
const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
if (!regex.test(text)) return null
const [dia, mes, año] = text.split('/').map(n => parseInt(n))
const fecha = moment.tz({ day: dia, month: mes - 1, year: año }, 'America/Buenos_Aires')
if (!fecha.isValid()) return null
const ahora = moment.tz('America/Buenos_Aires')
const edad = ahora.diff(fecha, 'years')
if (edad < 5 || edad > 120) return null
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
return `${dia} de ${meses[mes - 1]} de ${año}`
}
const birth = validarFechaNacimiento(text)
if (!birth) {
return conn.sendMessage(m.chat, { text: `📍  El detalle de la fecha no coincide o no tiene razon.\n- Debe de ingresar su fecha de cumpleaños.\n\n• Por ejemplo:\n*${usedPrefix + command}* 03/03/2000` }, { quoted: m })
}
user.birth = birth
return conn.sendMessage(m.chat, { text: `✅  Se ha configurado tu fecha de cumpleaños a ( *${user.birth}* ) con exito.` }, { quoted: m })
break
}
case 'd-cumple': {
if (!user.birth) {
return conn.sendMessage(m.chat, { text: `📍  No tienes una fecha de cumpleaños establecido en tu perfil.\n- Para editar tu fecha de cumpleaños use el comando *${usedPrefix}p-birth*.` }, { quoted: m })
}
user.birth = ''
return conn.sendMessage(m.chat, { text: `✅  Se ha eliminado tu fecha de nacimiento con éxito.` }, { quoted: m })
break
}
case 'p-genero': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su género para establecerlo en el bot.\n\n• Por ejemplo:\n*${usedPrefix + command}* hombre\n*${usedPrefix + command}* mujer` }, { quoted: m })
function asignarGenre(text) {
let genre
switch (text.toLowerCase()) {
case "hombre":
genre = "Hombre"
break
case "mujer":
genre = "Mujer"
break
default:
return null
}
return genre
}
let genre = asignarGenre(text)
if (!genre) {
return conn.sendMessage(m.chat, { text: `📍  El genero ( *${text}* ) no existe.\n- Elija un genero existente entre *Hombre* y *Mujer*.\n\n• Por ejemplo:\n*${usedPrefix + command}* hombre\n*${usedPrefix + command}* mujer` }, { quoted: m })
}
if (user.genre === genre) {
return conn.sendMessage(m.chat, { text: `📌  No puedes agregar otro genero.\n- Ya tienes un genero establecido como ( *${user.genre}* ).` }, { quoted: m })
}
user.genre = genre
return conn.sendMessage(m.chat, { text: `✅  Se ha configurado tu genero a ( *${user.genre}* ) con éxito.` }, { quoted: m })
break
}
case 'd-genre': {
if (!user.genre) {
return conn.sendMessage(m.chat, { text: `📍  No tienes un genero establecido en tu perfil.\n- Puede editar su genero con el comando *${usedPrefix}p-genero*.` }, { quoted: m })
}
user.genre = ''
return conn.sendMessage(m.chat, { text: `✅  Se ha eliminado tu genero con exito.` }, { quoted: m })
break
}
case 'p-desc': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba una descripción corta para su descripción en el perfil.\n\n• Por ejemplo:\n*${usedPrefix + command}* Hola este es mi perfil.` }, { quoted: m })
user.description = text
return conn.sendMessage(m.chat, { text: `✅  Se ha configurado tu descripción a ( *${user.description}* ) en tu perfil con exito.` }, { quoted: m })
break
}
case 'd-desc': {
if (!user.description) {
return conn.sendMessage(m.chat, { text: `📍  No tienes una descripción establecida en tu perfil.\n- Puedes editar tu descripción usando el comando *${usedPrefix}p-desc*.` }, { quoted: m })
}
user.description = ''
return conn.sendMessage(m.chat, { text: `✅  Se ha eliminado tu descripción con éxito.` }, { quoted: m })
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
}}


handler.tags = ['rpg']
handler.command = ['p-genero', 'd-genero', 'd-cumple', 'p-cumple', 'p-desc', 'd-desc']

export default handler