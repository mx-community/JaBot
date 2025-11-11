import axios from 'axios'

let handler = async (m, { usedPrefix, command, conn, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre del usuario en TikTok para ver su información.\n\n• Por ejemplo:\n*#${command}* bandfood` }, { quoted: m })
try {
conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let ress = await axios.get(`https://api.koboo.my.id/api/stalk/tiktok?username=${text}`)
let res = ress.data
if (res.status !== 200) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados de la búsqueda.\n- Verifique si esta bien escrito y vuelva a intentarlo.` }, { quoted: m })
let user = res.result.user
let stats = res.result.stats
let profileTab = user.profileTab

let teks = `·─┄ · ✦ *TikTok : Users* ✦ ·

> ⩽ *Usuario* ⩾
⊹ ✎ *Nombre:* ${user.uniqueId} (@${user.nickname})
⊹ ✎ *ID:* ${user.id}
⊹ ✎ *Seguidores:* ${stats.followerCount}
⊹ ✎ *Seguidos:* ${stats.followingCount}

> ⩽ *Cuenta* ⩾
⊹ ✎ *Likes:* ${stats.heartCount}
⊹ ✎ *Videos:* ${stats.videoCount}
⊹ ✎ *Friends:* ${stats.friendCount}
⊹ ✎ *Region:* ${user.region || "undefined"}
⊹ ✎ *Descripción:* ${user.signature || 'Sin descripción'}

> ⩽ *Detalles : Cuenta* ⩾
⊹ ✎ *Cuenta:* ${user.privateAccount ? 'Privada.' : 'Publica.'}
⊹ ✎ *Verificación:* ${user.verified ? 'Si' : 'No'}
⊹ ✎ *Comercial:* ${user.commerceUserInfo.commerceUser ? 'Si' : 'No'}
⊹ ✎ *Descargas:* ${user.downloadSetting === 3 ? 'Permitido.' : 'Prohibido.'}
⊹ ✎ *Exp. Playlist:* ${user.canExpPlaylist ? 'Sí' : 'No'}

> ⩽ *Pestañas* ⩾
⊹ ✎ *P. musical:* ${profileTab.showMusicTab ? 'Sí' : 'No'}
⊹ ✎ *P. preguntas:* ${profileTab.showQuestionTab ? 'Sí' : 'No'}
⊹ ✎ *P. playlist:* ${profileTab.showPlayListTab ? 'Sí' : 'No'}
⊹ ✎ *Organización:* ${user.isOrganization ? 'Sí' : 'No'}
⊹ ✎ *Lenguaje:* ${user.language || 'Desconocido'}`

await conn.sendMessage(m.chat, { image: { url: user.avatarLarger }, caption: teks }, { quoted: m })

} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ['tiktokstalk *<usuario>*']
handler.tags = ['stalk']
handler.command = ['u-tt']


export default handler