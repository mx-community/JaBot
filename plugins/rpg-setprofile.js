import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
const user = global.db.data.users[m.sender]
if (command === 'setprofile') {
let categoriaPerfil = `📍  Para editar tu perfil, aqui te dejo algunas opciones disponibles en la edición del perfil.
- Próximamente se agregaran mas cosas de edición.

⊹✎ *#birth*
- _Agrega tu cumpleaños o fecha de nacimiento en tu perfil._

⊹✎ *#d-birth*
- _Elimina tu cumpleaños o fecha de nacimiento en tu perfil._

⊹✎ *#genero*
- _Agrega tu genero como mujer o hombre en tu perfil._

⊹✎ *#d-genero*
- _Elimina tu genero como hombre o mujer en tu perfil._

⊹✎ *#desc*
- _Agrega una descripción corta sobre ti en tu perfil._

⊹✎ *#d-desc*
- _Elimina la descripción corta sobre ti en tu perfil._`
return conn.sendMessage(m.chat, { text: categoriaPerfil }, { quoted: m })
}
switch (command) {
case 'birth': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su fecha de nacimiento para añadirlo a tu perfil.\n\n• Por ejemplo:\n*#${command}* 01/01/2015` }, { quoted: m })
function validarFechaNacimiento(text) {
const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
if (!regex.test(text)) return null
const [dia, mes, año] = text.split('/').map(n => parseInt(n))
const fecha = moment.tz({ day: dia, month: mes - 1, year: año }, 'America/Caracas')
if (!fecha.isValid()) return null
const ahora = moment.tz('America/Caracas')
const edad = ahora.diff(fecha, 'years')
if (edad < 5 || edad > 120) return null
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
return `${dia} de ${meses[mes - 1]} de ${año}`
}
const birth = validarFechaNacimiento(text)
if (!birth) {
return conn.sendMessage(m.chat, { text: `📍  La fecha no corresponde o no existe, recuerde usarlo correctamente.\n\n• Por ejemplo:\n*#${command}* 01/01/2000` }, { quoted: m })
}
user.birth = birth
return conn.sendMessage(m.chat, { text: `✓  Se ha confirmado tu fecha de cumpleaños como *( ${user.birth} )* con exito.` }, { quoted: m })
break
}
case 'd-birth': {
if (!user.birth) {
return conn.sendMessage(m.chat, { text: `📍  No tienes ninguna fecha de nacimiento establecido en tu perfil.` }, { quoted: m })
}
user.birth = ''
return conn.sendMessage(m.chat, { text: `✓  Tu fecha de nacimiento se ha eliminado con exito en tu perfil.` }, { quoted: m })
break
}
case 'genero': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su genero para establecerlo en tu perfil.\n\n• Por ejemplo:\n*#${command}* hombre` }, { quoted: m })
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
return conn.sendMessage(m.chat, { text: `📍  Debes proporcionar un genero valido, debido que solo hay dos géneros.\n\n• Por ejemplo:\n*#${command}* hombre\n*#${command}* mujer` }, { quoted: m })
}
if (user.genre === genre) {
return conn.sendMessage(m.chat, { text: `📍  Ya tienes un genero establecido com *${user.genre}* en tu perfil.` }, { quoted: m })
}
user.genre = genre
return conn.sendMessage(m.chat, { text: `✓  Se ha confirmado tu genero como *( ${user.genre} )* con exito en tu perfil.` }, { quoted: m })
break
}
case 'd-genero': {
if (!user.genre) {
return conn.sendMessage(m.chat, { text: `📍  No tienes ningun genero establecido en tu perfil.` }, { quoted: m })
}
user.genre = ''
return conn.sendMessage(m.chat, { text: `✓  Se ha eliminado tu genero en tu perfil con exito.` }, { quoted: m })
break
}
case 'desc': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba una descripción corta sobre ti para establecerlo en tu perfil.\n\n• Por ejemplo:\n*#${command}* Este es mi perfil del bot.` }, { quoted: m })
user.description = text
return conn.sendMessage(m.chat, { text: `✓  Se ha establecido tu descripción en tu perfil con exito.` }, { quoted: m })
break
}
case 'd-desc': {
if (!user.description) {
return conn.sendMessage(m.chat, { text: `📍  No tienes ninguna descripción establecida en tu perfil.` }, { quoted: m })
}
user.description = ''
return conn.sendMessage(m.chat, { text: `✓  Se ha eliminado tu descripción en tu perfil con éxito.` }, { quoted: m })
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['setprofile', 'setbirth', 'delbirth', 'setgenre', 'setgenero', 'delgenre', 'setdescription', 'setdesc', 'deldescription', 'deldesc']
handler.tags = ['rg']
handler.command = ['setprofile', 'birth', 'd-birth', 'genero', 'd-genero', 'desc', 'd-desc']
handler.group = true

export default handler