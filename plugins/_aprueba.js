import axios from 'axios';
const handler = async (m, { args, conn }) => {
if (args.length < 2) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto y un segundo texto con el simbolo mas.\n\n• *Por ejemplo:*\n${usedPrefix + command} MX + Alan.Js`}, { quoted: m });
const [titulo, slogan] = args.join(" ").split("+");
try {
await m.react("⏳")
let payload = { ai_icon: [333276, 333279], height: 300, idea: `Un Icono ${titulo}`, industry_index: "N", industry_index_id: "", pagesize: 4, session_id: "", slogan: slogan || "", title: titulo, whiteEdge: 80, width: 400 };
let { data } = await axios.post("https://www.sologo.ai/v1/api/logo/logo_generate", payload);
if (!data || !data.data.logoList.length) {
return conn.sendMessage(m.chat, { text: `No se ha podido crear el logo.\n- Esto puede ser un fallo en la api o en el comando, por lo tanto, intentelo de nuevo.`}, { quoted: m });
}

const logoUrls = data.data.logoList.map(logo => logo.logo_thumb);
for (let i = 1; i < logoUrls.length; i++) {
await conn.sendMessage(m.chat, { image: { url: logoUrls[i] } }, { quoted: m });
}
} catch (error) {
console.error("Error al generar el logo:", error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};
handler.command = ["logogen", "logoc"];

export default handler;
     
