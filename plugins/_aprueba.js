import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para crear una imagen.\n\n• *Por ejemplo:*\n${usedPrefix + command} Imagina un arbol.` }, { quoted: m })
try {
await m.react("⏳");
const result = await fluximg.create(text);
if (result && result.imageLink) {
await conn.sendMessage(m.chat, { image: { url: result.imageLink }, caption: `📷 *Foto creada por Flux AI.*` }, { quoted: m });
} else {
return conn.sendMessage(m.chat, { text: `No se ha podido generar la imagen, intentalo de nuevo.`}, { quoted: m });
}
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
};

handler.command = ["flux"];
export default handler;

const fluximg = {
defaultRatio: "2:3", 

create: async (query) => {
const config = {
headers: {
accept: "*/*",
authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
"user-agent": "Postify/1.0.0",
},
};

try {
const response = await axios.get(
`https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(
query
)}&aspect_ratio=${fluximg.defaultRatio}`,
config
);
return {
imageLink: response.data.image_link,
};
} catch (error) {
console.error(error);
throw error;
}
},
};

