import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, args, command, __dirname, participants }) => {
try {
const user = global.db.data.users[m.sender] || {}
const name = await conn.getName(m.sender)
const thumbBot = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())
const premium = user.premium ? '✓' : '✘'
const limit = user.limit || 0
const totalreg = Object.keys(global.db.data.users).length
const groupUserCount = m.isGroup ? participants.length : '-'
const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
const uptime = clockString(process.uptime() * 1000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido 🌐'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)

await m.react('👋🏻')
if (!args[0]) {
let menu = `> 👋🏻 Hola @${name}, que este dia ${dia} tengas el animo de seguir adelante.
📍  Debe de ingresar la seccion para buscar ayuda o consejo.

*#${command} principiante* 
> ╰» _Mira las guias de principiantes en *Honor Of Kings*._

*#${command} expertos* 
> ╰» _Mira la guia de participantes expertos en *Honor Of Kings*._

*#${command} avanzados* 
> ╰» _Mira la guia de participantes avanzados en *Honor Of Kings*._

*#${command} comunidad* 
> ╰» _Unete a nuestra comunidad facil y seguro._

*#${command} youtube* 
> ╰» _Mira las novedades en *YouTube* para aprender mas sobre el juego._

*#${command} personajes* 
> ╰» _Mira la categoría y nombre de los personajes._


• Ejemplo de uso:
*#hok youtube*`
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === '1' || args[0] === 'principiante' || args[0] === 'principiantes') {
let menu1 = `📍  Sin texto agregado en la sección *Principiantes*.
> Solicite para agregar un contexto.`
return conn.sendMessage(m.chat, { text: menu1, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "experto" || args[0] === "expertos" || args[0] === "2") {
let menu2 = `📍  Sin texto agregado en la sección *Expertos*.
> Solicite para agregar un contexto.`
return conn.sendMessage(m.chat, { text: menu2, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "avanzado" || args[0] === "avanzados" || args[0] === "3") {
let menu3 = `📍  Sin texto agregado en la sección *Avanzados*.
> Solicite para agregar un contexto.`
return conn.sendMessage(m.chat, { text: menu3, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "comunidad" || args[0] === "4") {
let menu4 = `📍  No se ha agregado una comunidad en la sección.
> Solicite para agregar su comunidad o contexto.`
return conn.sendMessage(m.chat, { text: menu4, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "youtube" || args[0] === "5") {
let menu5 = `·─┄ · ✦ *Honor Of Kings* ✦ ·
> Visita el canal de *YouTube* de Honor Of Kings y disfruta de las novedades.

📌 *YouTube:*
- https://youtube.com/channel/UChejSWNZweEuMMPbg7UF1dA?si=Hp2b87wKBG7psxmT


> •  \`VINCULOS\`  •
🌐 *Google:*
╰ • support.google.com/youtube/answer/2579942

🌐 *Wikipedia:*
╰ • en.wikipedia.org/wiki/Honor_of_Kings

🌐 *Creative Commons:*
╰ • creativecommons.org/licenses/by-sa/3.0`
return conn.sendMessage(m.chat, { text: menu5, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} else if (args[0] === "personajes" || args[0] === "6") {
let menu6 = `
┌─────────────────⊹
⫶☰ HEROES : \`Tanque\`
• Arthur.
• Ata.
• Bai Qi.
• Donghuang.
• Pardo.
• Flowborn.
• Lian Po.
• Liu Bang.
• Liu Shan.
• Lu Bu.
• Xiang Yu.
• Zhang Fei.

⫶☰ HEROES : \`Combatiente\`
• Allain.
• Arthur.
• Athena.
• Augran.
• Biron.
• Butterfly.
• Charlotte.
• Dharma.
• Dian Wei.
• Dun.
• Fatih.
• Fuzi.
• Guan Yu.
• Heino.
• Kaizer.
• Li Xin.
• Liu Bei.
• Lu Bu.
• Luna.
• Mayene.
• Menki.
• Mulan.
• Mozi.
• Musashi.
• Nezha.
• Sun Ce.
• Umbrosa.
• Wuyan.
• Yao.
• Yang Jian.
• Ying.
• Zilong.

⫶☰ HEROES : \`Asesino\`
• Arke.
• Augran.
• Cirrus.
• Feyd.
• Gao Changgong.
• Han Xin.
• Jing.
• Lam.
• Lu Bai.
• Mai Shiranui.
• Mulan.
• Nakoruru.
• Pei.
• Sima Yi.
• Ukyo Tachibana.
• Wukong.
• Xuance.
• Ying.
• Zilong.

⫶☰ HEROES : \`Mago\`
• Angela.
• Da Qiao.
• Daji.
• Diao Chan.
• Dr Bian.
• Gen & Mo.
• Gao.
• Garuda.
• Heino.
• Flowborn.
• Kongming.
• Lady Zhen.
• Liang.
• Luna.
• Mai Shinarui.
• Mi yue.
• Milady.
• Mozi.
• Nuwa.
• Zakeer.


📍  *Loading...* 67%
> Proceso no terminado, reinicie el bot al terminar... `
return conn.sendMessage(m.chat, { text: menu6, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "macro" || args[0] === "start" || args[0] === "0") {
let menuAll = `𝙐𝙣 𝙥𝙤𝙘𝙤 𝙙𝙚 𝙃𝙤𝙆: 𝘼𝙥𝙧𝙚𝙣𝙙𝙞𝙚𝙣𝙙𝙤 𝙘𝙤𝙣 𝙉𝙞𝙜𝙝𝙩 𝘾𝙖𝙥.
┬⁠─⁠─⁠┬⁠◡⁠ﾉ⁠(⁠°⁠ ⁠-⁠°⁠ﾉ⁠)

📍  Comencémos con un nuevo capítulo, por lo que veo has progresado muchísimo, es momento de expandirnos, ir a huevos horizontes para aprender de este grandioso juego en el que ves todo tipo de jugador, no te preocupes, no vas a feedear después de esto, te lo aseguro querido camarada, no seas como el brasileño promedio.
Capitulo 1: parte 1: Mas vale un equipo organizado que un montón de leyenditas cayendo por su propio ego.

✧⁠\⁠(⁠>⁠o⁠<⁠)⁠ﾉ⁠✧
¡Claro que sí! 



🧭 Introducción al MACRO GAME (Early Game) – Honor of Kings

El early game (primeros 3–5 minutos) es la fase más importante para sentar la base de la partida, hacer tu choza en la que tramas un gran plan. Aquí se definen ventajas como prioridad de línea, control del mapa, visión, presión en objetivos y rutas de jungla.

Esta guía te ayuda a qué hacer, por qué hacerlo y cómo decidir en cada rol.


⭐ 1. Conceptos Básicos de Macro en Early Game

1.1 Prioridad de Línea (Lane Priority)

Tener prioridad significa limpiar la oleada más rápido que el rival.

Esto te permite:

Rotar a río/objetivos antes que ellos.

Ayudar a tu jungla.

Dar visión.

Evitar gankeos.


1.2 Control de Oleadas (Wave Control)

En los primeros minutos enfócate en:

Push rápido si tu héroe es fuerte al nivel 1–2.

Congelar frente a tu torre si eres débil y quieres evitar ganks.

No perder minions bajo ninguna razón.


1.3 Timing de Objetivos

Los primeros objetivos aparecen:

Tirano y jefe: Minuto 2.

Torres: Con la presión de línea y minions mejorados tras los 3 min.


1.4 Rotaciones Inteligentes

Rotar nunca debe ser al azar.
Solo se rota cuando se cumple al menos una condición: 

✅ Tienes la oleada pusheada.

✅ Tu jungla inicia un objetivo.

✅ Hay un 2v1 o 3v2 favorable.

❎ No rotar dejando tu torre sola y perdiendo 1–2 waves.


🔱 2. Macro por Rol en Early Game


🦊 2.1 Para Jungla

✅ Ruta inicial eficiente

Siempre empieza por tu lado fuerte (donde esté tu soporte o tu tirador para ayudar).

Evita duelos innecesarios al nivel 2.


✅ Primeras decisiones

Checa qué línea tiene prioridad. Esa línea es tu ruta natural de gank.

Si top tiene prioridad, puedes forzar una pelea para habilitar el portal top (muy importante en competitivo).


✅ Early invade

Solo invade si:

Tu mid tiene prioridad.

Tu side más cercano está empujando.

Tu jungla es fuerte al nivel 1–2 (Changong, Han Xin, Pei, etc).


✅ Objetivos

Asegura el tirano si el mid te pegó la rotación.

Toma el tirano al minuto 2 si tienes prioridad en mid y bot.


🛡 2.2 Para Soporte

✅ Primer minuto

Acompaña al ADC a la primera limpieza, recuerda, el ADC es muy débil en Early Game y dejarlo solo supondría un gran riesgo que no queremos tomar.

No te quedes AFK en línea; provee visión y presión.


✅ Tareas clave

Dar visión agresiva si tienes prioridad.

Controlar el río.

Rotar entre mid–jungla constantemente.


✅ Mecánica esencial

Si tienes un tanque:

Entra, fuerza habilidades, retrocede.

Si eres soporte de utilidad (buffer):

Asegura picks.

Acompaña rotaciones.

Protege al tirador en early si es débil.


🔮 2.3 Para Midlaner

✅ Nivel 1–2

Limpia la oleada rápido con habilidades.

Rota al río según hacia dónde vaya tu jungla.


✅ Tu importancia en el macro temprano

El mid define:

Control de visión en el río.

Ayuda al jungla en el primer gankeo.

Presión sobre bot para el primer tirano.

Nunca te quedes pegado en línea sin mirar el minimapa.


🗡️🤺 2.4 Para Toplaner

✔ Primeros minutos

Evalúa el matchup:

Si eres fuerte al inicio (Arthur, Biron, Dharma): presiona.

Si eres débil (Xiang Yu, Allain, Charlotte): juega defensivo.

✅ Objetivo clave en top

El portal:

Si el jungla te ayuda y te habilita prioridad, puedes abrir:

Rotaciones globales.

Teleport seguro para Tirano/bot.

Ventaja brutal en macro.

Por eso en competitivo sí ayudan al top en early para el portal.

🎯 2.5 Para Tirador (ADC)

✅ Lo más importante

No morir en early (en serio, amigo).

No perder minions.

No gastar destello por gusto y en jugadas tontas como asegurar una kill que ni siquiera es rentable y condena a todos en la TF.


✅ Si tienes un soporte tanque

Aprovecha la presión temprana (Lian Po, Zhang Fei, Liu Shan, Kui, etc).

Cambien a river (río) para visión y regresar rápido.

✅ Si tienes soporte buffer.

Jueguen más safe.

Esperen nivel 4 para pelear por tirano.

🧠 3. Lectura de Mapa en Early Game

✅ Información que siempre debes revisar:

¿Quién tiene prioridad en cada línea?

¿Dónde está el jungla enemigo?

¿Qué objetivos van a aparecer?

¿Hay sumoner spells en cooldown?

¿Qué torres son vulnerables?


✅🏆 Regla de oro:

Si una línea no tiene prioridad, nunca fuerces un objetivo cerca de esa línea.

Ejemplo:
Si bot está perdiendo ➡️ No inicies tirano a menos que puedan tomar ventaja de ello en una buena TF por superioridad numérica.


🤓☝️ 4. Macro de Objetivos Tempranos

🌊 Tirano(2 minutos)

Ideal si:

Mid limpia primero.

Soporte rota.

El jungla está cerca.


Da oro y XP, y puede darte más daño.

🐉 Jefe (2:00)

Asegúralo si:

Top tiene prioridad.

Mid rota contigo.

Enséñale a tu top que no baje si no tiene portal.


🏹 Torres

No presiones torre sin minions.

Hazlo SOLO si:

El jungla mató al enemigo.

Tienes una wave grande.

No perderás otra torre a cambio.

🔥 5. Errores Comunes en Early Game (y cómo evitarlos)

❌ Rotar sin push.
❌ Forzar peleas 4v5.
❌ Seguir al soporte aunque sea mala decisión.
❌ No atender side lanes después del minuto 3.
❌ Regalar kills por no respetar power spikes del rival.

✅Sé paciente.
✅ Observa cooldowns.
✅ Mira minimapa cada 3–4 segundos.



🏆 6. Mini Ruta Ideal Minuto por Minuto

0:00–0:30

Soporte acompaña ADC y da visión para su jungla.

Mid limpia wave.

Top y bot juegan seguro.


0:30–2:00

Contestación del tirano si es posible.

Mid y support ayudan.


1:00–2:00

Jungla gankea la línea con prioridad.

Da visión profunda.


2:00–3:00

Bot rota.

Mid se activa al 100%.

3:00–5:00

Torre bot enemiga cae si hubo ventaja.

Top obtiene un portal.

Comienza el juego macro más agresivo.

Continuará...

PONGAN LA MÚSICA (⁠╬⁠☉⁠д⁠⊙⁠)⁠⊰⁠⊹ฺ`
return conn.sendMessage(m.chat, { text: menuAll, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}
handler.help = ['hok  <category>', 'kings  <category>']
handler.tags = ['kings']
handler.command = ['hok', 'kings']


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
 }
 
/*
╭───[ ⛉ PROPIETARIO ⛉ ]─•
│#   │
│#│
│# │✎ texto.
│# │✎ texto.
│#  │✎ reply.
│#   │✎ texto.
│# │
│#    │✎ query.
│#    │✎ query.
╰─────────────────•
*/