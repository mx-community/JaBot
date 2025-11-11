import axios from 'axios'
var handler = async(m, { conn, text, command, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de un usuario en *GitHub* para buscarlo.\n\n• Por ejemplo:\n*#${command}* LolHuman` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let request = await githubstalk(text) 
let { username, following, followers, type, bio, company, blog, location, email, public_repo, public_gists, profile_pic } = request
let thumb = await (profile_pic)
let hasil = `·─┄ · ✦ *GitHub : Users* ✦ ·

> ⩽ *Usuario* ⩾
⊹ ✎ *Nombre:* ${username}
⊹ ✎ *Seguidores:* ${followers}
⊹ ✎ *Seguidos:* ${following}
⊹ ✎ *Repositorios:* ${public_repo} en total.

> ⩽ *Cuenta* ⩾
⊹ ✎ *Compañía:* ${company}
⊹ ✎ *Gmail:* ${email}
⊹ ✎ *Gists:* ${public_gists}

> ⩽ *Detalles* ⩾
⊹ ✎ *Ubicación:* ${location}
⊹ ✎ *Blog:* ${blog}
⊹ ✎ *Tipo:* ${type}

> *Descripción:*
${bio}
`

conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m, rcanal)
}
handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['stalk']
handler.command = ['u-github', 'u-git']

export default handler

async function githubstalk(user) {
return new Promise((resolve, reject) => {
axios.get('https://api.github.com/users/'+user)
.then(({ data }) => {
let hasil = {
username: data.login,
nickname: data.name,
bio: data.bio,
id: data.id,
nodeId: data.node_id,
profile_pic: data.avatar_url,
url: data.html_url,
type: data.type,
admin: data.site_admin,
company: data.company,
blog: data.blog,
location: data.location,
email: data.email,
public_repo: data.public_repos,
public_gists: data.public_gists,
followers: data.followers,
following: data.following,
ceated_at: data.created_at,
updated_at: data.updated_at
}
resolve(hasil)
})
})
}
