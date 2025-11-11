import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix, args }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : m.sender)
let from = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
let who = await (async () => global.db.data.users[userId].name || (async () => { try { const n = await conn.getName(userId); return typeof n === 'string' && n.trim() ? n : userId.split('@')[0] } catch { return userId.split('@')[0] } })())()
let str, query

if (args[0] === "enojado") {

} else if (args[0] === "alegre" {

} else {

 }
}

handler.command = ["rc", "r"]
export default handler.