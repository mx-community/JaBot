import fetch from 'node-fetch'
let handler = async (m, {conn, command}) => {
let user = db.data.users[m.sender]
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let experto = `
〆 I N F O  :  U P L O A D
\t𝇈 📌 \`\`\`Informate bien.\`\`\`

\t\t⚶ *COMANDO*
- _Para usar el comando \`#wadd\` necesitas 5 requisitos, poner nombre, genero, valor, rango y imagen subida a qu.ax o catbox._

> 1. _Específica el nombre del anime que envias, sea nombre completo o únicamente el nombre individual._

> 2. _Añade el genero del anime con correspondencia, y no existe otro genero, solo dos. *(Hombre o Mujer)*._

> 3. _Agrega el valor del personaje, recuerda que el valor no debe ser mayor a *10 millones*, ya que el límite es de *5 Millones*._

> 4. _Agrega el rango del anime, los rangos existentes son: *(comun, raro, superior, elite, legendario)*, entre estos elige uno solo._

> 5. _Añade un enlace directo que muestre la foto del personaje, en ese caso puedes usar *(qu_ax o catbox)* para subir la imagen._


\t\t⚶ *SUBIR IMÁGENES*
- _Sube las imagenes usando el comando *#turl* o *#catbox*._

> 📍 Recuerda responder a la imagen con el comando para convertirlo en un enlace directo.`

await conn.sendMessage(m.chat, { text: experto, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  I N F O  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}
handler.command = ["iw", "wi"]
export default handler

  
