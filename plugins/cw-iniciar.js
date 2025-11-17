import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command, conn }) => {
const args = text.split(',').map(arg => arg.trim())

if (args.length < 7) {
let formatoXd = `Ingrese el comando y los formatos correspondientes para añadir un personaje.
- Debes agregar 7 formatos para completar.

> *Nombre, Genero, Valor, Origen, Imagen 1, Imagen 2, Imagen 3.

• Por ejemplo:
*${usedPrefix + command}* Takeda Harumi, Masculino, 1000, My Senpai Is Annoying, https://ejemplo, https://ejemplo2, https://ejemplo3`
return conn.sendMessage(m.chat, { text: formatoXd }, { quoted: m })
}

const [name, gender, value, source, img1, img2, img3] = args

if (!img1.startsWith('http') || !img2.startsWith('http') || !img3.startsWith('http')) {
return conn.sendMessage(m.chat, { text: `📍  No se han podido acceder a los enlaces enviados.\n- Los enlaces deben ser de catbox.moe o qu.ax para poder accederlos.` }, { quoted: m })
}

const characterData = {
id: Date.now().toString(),
name,
gender,
value,
source,
img: [img1, img2, img3],
vid: [],
user: null,
status: "Libre",
votes: 0
}

// Cambia este número por el del staff
const tagNumber = global.owner?.[0]?.[0] + '@s.whatsapp.net' || '5493873655135@s.whatsapp.net'

const jsonMessage = `·─┄ · ✦ *Nuevo Personaje* ✦ ·

✦ *Solicitado:* @${m.sender.split('@')[0]}
⏍ *Fecha:* ${fecha}
⎙ *Codigo de envio:*

\`\`\`${JSON.stringify(chatacterData, null, 2)}\`\`\`
`
try {
await conn.sendMessage(tagNumber, { text: jsonMessage, mentions: [m.sender]})

let enviadoExito = `·─┄ · ✦ *Personaje : Enviado* ✦ ·
> Los datos del personaje ( *${name}* ) fueron enviados a los desarrolladores del bot con éxito.

*Nota:*
- Segun los datos tu personaje es ${name} de genero ${gender} y de origen "${sourse}".
Y el valor de este personaje es aproximadamente ${value} de *${currency}*.`
await conn.reply(m.chat, enviadoExito, m)
conn.reply(m.chat, "¡Gracias por usar nuestro proyecto!", m)
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.command = ['new-p', 'addcw']
handler.tags = ['personajes']
handler.help = ['addcw']

export default handler

