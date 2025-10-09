import os from 'os'
import util from 'util'
import moment from 'moment-timezone'
import baileys from '@whiskeysockets/baileys'
const { proto } = baileys

let handler = async (m, { conn }) => {
  try {
    const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    const name = await conn.getName(m.sender)
    const uptime = clockString(process.uptime() * 1000)
    const totalUsers = Object.keys(global.db.data.users).length
    const registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    const totalCommands = Object.keys(global.plugins).length
    const latensi = (new Date() - m.messageTimestamp * 1000).toFixed(4)
    const format = size => (size / 1024 / 1024).toFixed(2) + ' MB'
    const totalmem = () => os.totalmem()
    const freemem = () => os.freemem()
    const fecha = moment.tz('America/Lima').format('DD/MM/YY')
    const hora = moment.tz('America/Lima').format('HH:mm:ss')
    const dia = moment.tz('America/Lima').format('dddd')
    const ucapan = () => {
      const time = moment.tz('America/Lima').format('HH')
      if (time >= 4 && time < 12) return '🌅 𝐁𝐮𝐞𝐧𝐨𝐬 𝐝í𝐚𝐬'
      if (time >= 12 && time < 18) return '🌤️ 𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬'
      return '🌙 𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬'
    }

    const menu = `
\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟☁️⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬⭐ ࣮࣮᷑᷑𝐊֘𝐀۫𝐍〪࣮࣫𝐄۪۫࣫𝐊𝐈᮫࣮𝆬᷑•۫֘ ᮫𝆬ᤲ࣫𝐕֘ ᮫𝆬ᤲ࣫3֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\`

> \`\`\`${ucapan()} ᭡̵໋࡙ᮬ @${mentionedJid.split('@')[0]}\`\`\`
> \`\`\` ꨩ🍄ּֽ֪۪۪〫ࣳׄ ${dia} | ${fecha} | ${hora} *⃟░\`\`\`

  ☁️ *ᴜsᴜᴀʀɪᴏ:* ${name}
  🪷 *ᴄʀᴇᴀᴅᴏʀ:* 𝐒𝐡𝐚𝐝𝐨𝐰-𝐱𝐲𝐳
  🎋 *ᴄᴏᴍᴀɴᴅᴏs:* ${totalCommands}
  🪾 *ᴠs:* ${vs}
  🍃 *ʟɪʙʀᴇʀɪᴀ:* ${libreria}
  🪹 *ʙᴏᴛ:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
  🌹 *ʀᴜɴᴛɪᴍᴇ:* ${uptime}
  🪴 *ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers} (${registeredUsers})
  🫟 *ɴᴏ ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers - registeredUsers}
  
  🫛 *ʟᴀᴛᴇɴᴄɪᴀ:* ${latensi} ms
  🍓 *ʀᴀᴍ ᴜsᴀᴅᴀ:* ${format(totalmem() - freemem())}
  🌲 *ʀᴀᴍ ᴛᴏᴛᴀʟ:* ${format(totalmem())}
  🕸️ *ʀᴀᴍ ʟɪʙʀᴇ:* ${format(freemem())}  
  👻 *sᴏᴄᴋᴇᴛs ᴏɴʟɪɴᴇ:* ${totalUsers || '0'}
  🪵


╭══✦〘 𝑬𝑪𝑶𝑵𝑶𝑴𝒀 〙✦══╮
│ 「 🩸 *Kaneki’s Path to Power* 🩸 」
│ 𝘎𝘢𝘯𝘢, 𝘳𝘪𝘦𝘴𝘨𝘢 𝘺 𝘴𝘰𝘣𝘳𝘦𝘷𝘪𝘷𝘦 𝘦𝘯 𝘦𝘭 𝘮𝘶𝘯𝘥𝘰 𝘨𝘩𝘰𝘶𝘭.
│
├── ⚔️ *#w • #work • #trabajar*
├── 💋 *#slut • #protituirse*
├── 🎲 *#coinflip • #flip • #cf* + [cantidad] <cara/cruz>
├── 🩶 *#crime • #crimen*
├── 🎯 *#roulette • #rt* + [red/black] [cantidad]
├── 🕹️ *#casino • #apostar* • *#slot* + [cantidad]
├── 💳 *#balance • #bal • #bank* + <usuario>
├── 💰 *#deposit • #dep • #depositar • #d* + [cantidad] | all
├── 💸 *#withdraw • #with • #retirar* + [cantidad] | all
├── 📊 *#economyinfo • #einfo*
├── 🎁 *#givecoins • #pay • #coinsgive* + [usuario] [cantidad]
├── ⛏️ *#miming • #minar • #mine*
├── 🗓️ *#daily • #diario*
├── 🎀 *#cofre* • *#coffer*
├── 📆 *#weekly • #semanal*
├── 🕯️ *#monthly • #mensual*
├── 🩸 *#steal • #robar • #rob* + [@mencion]
├── 🧿 *#economyboard • #eboard • #baltop* + <pagina>
├── ⚔️ *#aventura • #adventure*
├── ❤️ *#curar • #heal*
├── 🐺 *#cazar • #hunt*
├── 🎣 *#fish • #pescar*
└── 🕸️ *#mazmorra • #dungeon*
╰══✦「 ☠️ *Tokyo Ghoul System* ☠️ 」✦══╯


╭══✦〘 𝑫𝑶𝑾𝑵𝑳𝑶𝑨𝑫 〙✦══╮
│ 「 🩸 *Kaneki’s Collector Instinct* 🩸 」
│ 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢 𝘭𝘰 𝘲𝘶𝘦 𝘯𝘦𝘤𝘦𝘴𝘪𝘵𝘦𝘴, 𝘤𝘰𝘯𝘴𝘶𝘮𝘦 𝘥𝘢𝘵𝘰𝘴 𝘤𝘰𝘮𝘰 𝘶𝘯 𝘨𝘩𝘰𝘶𝘭.
│
├── 🎴 *#tiktok • #tt* + [link / búsqueda]
├── 📦 *#mediafire • #mf* + [link]
├── 🧩 *#mega • #mg* + [link]
├── 🎧 *#play • #play2 • #ytmp3 • #ytmp4* + [canción / link]
├── 📘 *#facebook • #fb* + [link]
├── 🕊️ *#twitter • #x* + [link]
├── 📸 *#ig • #instagram* + [link]
├── 🌸 *#pinterest • #pin* + [búsqueda / link]
├── 🖼️ *#image • #imagen* + [búsqueda]
├── ⚙️ *#apk • #modapk* + [búsqueda]
└── 🔍 *#ytsearch • #search* + [búsqueda]
╰══✦「 ☠️ *Tokyo Ghoul Network* ☠️ 」✦══╯


╭══✦〘 𝑮𝑨𝑪𝑯𝑨 〙✦══╮
│ 「 🩸 *Kaneki’s Collection of Souls* 🩸 」
│ 𝘙𝘦𝘤𝘭𝘢𝘮𝘢, 𝘤𝘰𝘮𝘳𝘢 𝘺 𝘭𝘪𝘣𝘦𝘳𝘢 𝘱𝘦𝘳𝘴𝘰𝘯𝘢𝘫𝘦𝘴 𝘦𝘯 𝘦𝘴𝘵𝘦 𝘮𝘶𝘯𝘥𝘰 𝘳𝘰𝘵𝘰.
│
├── 💎 *#buycharacter • #buychar • #buyc* + [nombre]
├── 🖼️ *#charimage • #waifuimage • #cimage • #wimage* + [nombre]
├── 📜 *#charinfo • #winfo • #waifuinfo* + [nombre]
├── 🔥 *#claim • #c • #reclamar* + {citar personaje}
├── 💀 *#delclaimmsg*
├── 🗑️ *#deletewaifu • #delwaifu • #delchar* + [nombre]
├── 🏆 *#favoritetop • #favtop*
├── 🩸 *#gachainfo • #ginfo • #infogacha*
├── 🎁 *#giveallharem* + [@usuario]
├── 🎴 *#givechar • #givewaifu • #regalar* + [@usuario] [nombre]
├── ⚔️ *#robwaifu • #robarwaifu* + [@usuario]
├── 💠 *#harem • #waifus • #claims* + <@usuario>
├── 🛒 *#haremshop • #tiendawaifus • #wshop* + <página>
├── ❌ *#removesale • #removerventa* + [precio] [nombre]
├── 🎲 *#rollwaifu • #rw • #roll*
├── 💰 *#sell • #vender* + [precio] [nombre]
├── 📚 *#serieinfo • #ainfo • #animeinfo* + [nombre]
├── 🧾 *#serielist • #slist • #animelist*
├── 🕯️ *#setclaimmsg • #setclaim* + [mensaje]
├── ⚖️ *#trade • #intercambiar* + [tu personaje] / [personaje 2]
├── ❤️ *#vote • #votar* + [nombre]
└── 👑 *#waifusboard • #waifustop • #topwaifus • #wtop* + [número]
╰══✦「 ☠️ *Tokyo Ghoul Gacha System* ☠️ 」✦══╯

╭══✦〘 𝑺𝑶𝑪𝑲𝑬𝑻𝑺 〙✦══╮
│ 「 🩸 *Kaneki’s Network Control* 🩸 」
│ 𝘊𝘳𝘦𝘢, 𝘤𝘰𝘯𝘵𝘳𝘰𝘭𝘢 𝘺 𝘦𝘹𝘱𝘢𝘯𝘥𝘦 𝘵𝘶 𝘦𝘯𝘭𝘢𝘤𝘦 𝘨𝘩𝘰𝘶𝘭 𝘦𝘯 𝘭𝘢 𝘳𝘦𝘥.
│
├── 🧩 *#qr • #code*
├── 🤖 *#bots • #botlist*
├── 💠 *#status • #estado*
├── ⚡ *#p • #ping*
├── 🔗 *#join* + [invitación]
├── 🕳️ *#leave • #salir*
├── 🔒 *#logout*
├── 🖼️ *#setpfp • #setimage*
├── 💬 *#setstatus* + [estado]
└── 🧠 *#setusername* + [nombre]
╰══✦「 ☠️ *Tokyo Ghoul Socket System* ☠️ 」✦══╯

╭══✦〘 𝑼𝑻𝑰𝑳𝑰𝑻𝑰𝑬𝑺 〙✦══╮
│ 「 🩸 *Kaneki’s Digital Arsenal* 🩸 」
│ 𝘌𝘹𝘱𝘭𝘰𝘳𝘢 𝘭𝘢 𝘮𝘢𝘲𝘶𝘪𝘯𝘢 𝘥𝘦 𝘭𝘢 𝘷𝘦𝘳𝘥𝘢𝘥 𝘦𝘯 𝘭𝘢𝘴 𝘴𝘰𝘮𝘣𝘳𝘢𝘴 𝘥𝘦 𝘭𝘢 𝘳𝘦𝘥.
│
├── 🧭 *#help • #menu*
├── 💻 *#sc • #script*
├── 🧩 *#sug • #suggest*
├── ⚠️ *#reporte • #reportar*
├── 🧮 *#calcular • #cal*
├── 🗑️ *#delmeta*
├── 👁️ *#getpic • #pfp* + [@usuario]
├── 🗣️ *#say* + [texto]
├── 🪞 *#setmeta* + [autor] | [pack]
├── 🧷 *#sticker • #s • #wm* + {imagen/video}
├── 🖼️ *#toimg • #img* + {sticker}
├── 💫 *#brat • #bratv • #qc • #emojimix*
├── ⚙️ *#gitclone* + [link]
├── 🔮 *#enhance • #remini • #hd*
├── ✒️ *#letra • #style*
├── 👁️‍🗨️ *#read • #readviewonce*
├── 🌐 *#ss • #ssweb*
├── 🌍 *#translate • #traducir • #trad*
├── 🧠 *#ia • #gemini*
├── 📤 *#tourl • #catbox*
├── 📚 *#wiki • #wikipedia*
├── 🎨 *#dalle • #flux*
├── 📦 *#npmdl • #nmpjs*
└── 🔎 *#google*
╰══✦「 ☠️ *Tokyo Ghoul Utility Core* ☠️ 」✦══╯


╭══✦〘 𝑷𝑹𝑶𝑭𝑰𝑳𝑬𝑺 〙✦══╮
│ 「 🩸 *Kaneki’s Identity Archive* 🩸 」
│ 𝘓𝘢 𝘦𝘴𝘦𝘯𝘤𝘪𝘢 𝘥𝘦 𝘵𝘶 𝘢𝘭𝘮𝘢 𝘨𝘩𝘰𝘶𝘭 𝘳𝘦𝘴𝘪𝘥𝘦 𝘦𝘯 𝘵𝘶 𝘱𝘦𝘳𝘧𝘪𝘭.
│
├── 🏆 *#leaderboard • #lboard • #top* + <página>
├── ⚡ *#level • #lvl* + <@mención>
├── 💍 *#marry • #casarse* + <@mención>
├── 🧬 *#profile* + <@mención>
├── 🎂 *#setbirth* + [fecha]
├── 📝 *#setdescription • #setdesc* + [descripción]
├── ⚧️ *#setgenre* + Hombre | Mujer
├── ❌ *#delgenre • #delgenero*
├── ⌛ *#delbirth*
├── 💔 *#divorce*
├── 🌸 *#setfavourite • #setfav* + [personaje]
├── 🗑️ *#deldescription • #deldesc*
└── 👑 *#prem • #vip*
╰═✦「 ☠️ *Tokyo Ghoul Profile Network* ☠️ 」✦═╯


╭══✦〘 𝑮𝑹𝑶𝑼𝑷𝑺 〙✦══╮
│ 「 🩸 *Kaneki’s Control Room* 🩸 」
│ 𝘋𝘰𝘮𝘪𝘯𝘢 𝘭𝘢 𝘤𝘢𝘳𝘯𝘪𝘤𝘦𝘳𝘪́𝘢 𝘥𝘦 𝘵𝘶 𝘨𝘳𝘶𝘱𝘰, 𝘭𝘪́𝘥𝘦𝘳 𝘨𝘩𝘰𝘶𝘭.
│
├── 📢 *#tag • #hidetag • #invocar • #tagall*
├── 🚨 *#detect • #alertas* + [on/off]
├── 🔗 *#antilink • #antienlace* + [on/off]
├── 🤖 *#bot* + [on/off]
├── 🔒 *#close • #cerrar*
├── ⚰️ *#demote* + <@usuario>
├── 💰 *#economy* + [on/off]
├── 🎲 *#gacha* + [on/off]
├── 🎉 *#welcome • #bienvenida* + [on/off]
├── 👋 *#setbye* + [texto]
├── 🤝 *#setprimary* + [@bot]
├── 🎊 *#setwelcome* + [texto]
├── 🔪 *#kick* + <@usuario>
├── ⚠️ *#nsfw* + [on/off]
├── 🕸️ *#onlyadmin* + [on/off]
├── 🔓 *#open • #abrir*
├── 🩸 *#promote* + <@usuario>
├── ➕ *#add • #añadir • #agregar* + [número]
├── 🧠 *#admins • #admin* + [texto]
├── ♻️ *#restablecer • #revoke*
├── ☠️ *#addwarn • #warn* + <@usuario>
├── 💀 *#unwarn • #delwarn* + <@usuario>
├── 📜 *#advlist • #listadv*
├── 🕯️ *#inactivos • #kickinactivos*
├── ⚔️ *#listnum • #kicknum* + [texto]
├── 🖼️ *#gpbanner • #groupimg*
├── 🏷️ *#gpname • #groupname* + [texto]
├── 📃 *#gpdesc • #groupdesc* + [texto]
├── 🗑️ *#del • #delete*
├── 💫 *#linea • #listonline*
├── 📁 *#gp • #infogrupo*
└── 🔗 *#link*
╰═✦「 ☠️ *Tokyo Ghoul Group System* ☠️ 」✦═╯

╭══✦〘 𝑨𝑵𝑰𝑴𝑬 〙✦══╮
│ 「 🩸 *Kaneki’s Emotions Core* 🩸 」
│ 𝘔𝘶𝘦𝘴𝘵𝘳𝘢 𝘵𝘶 𝘰𝘴𝘤𝘶𝘳𝘰 𝘦𝘯𝘦𝘮𝘰 𝘪𝘯𝘵𝘦𝘳𝘪𝘰𝘳, 𝘨𝘩𝘰𝘶𝘭 𝘴𝘦𝘯𝘴𝘪𝘵𝘪𝘷𝘰.
│
├── 😡 *#angry • #enojado*
├── 🛁 *#bath • #bañarse*
├── 🩸 *#bite • #morder*
├── 👅 *#bleh • #lengua*
├── 🌸 *#blush • #sonrojarse*
├── 😐 *#bored • #aburrido*
├── 👏 *#clap • #aplaudir*
├── ☕ *#coffee • #café*
├── 😭 *#cry • #llorar*
├── 🤗 *#cuddle • #acurrucarse*
├── 💃 *#dance • #bailar*
├── 🎭 *#dramatic • #drama*
├── 🍶 *#drunk • #borracho*
├── 🍜 *#eat • #comer*
├── 🤦 *#facepalm • #palmada*
├── 😁 *#happy • #feliz*
├── 🫂 *#hug • #abrazar*
├── 💉 *#impregnate • #preg • #embarazar*
├── 🔪 *#kill • #matar*
├── 💋 *#kiss • #muak*
├── 😚 *#kisscheek • #beso*
├── 😂 *#laugh • #reirse*
├── 👅 *#lick • #lamer*
├── ❤️ *#love • #amor*
├── 🫶 *#pat • #palmadita*
├── 👉 *#poke • #picar*
├── 😾 *#pout • #pucheros*
├── 👊 *#punch • #golpear*
├── 🏃 *#run • #correr*
├── 😔 *#sad • #triste*
├── 😱 *#scared • #asustado*
├── 😏 *#seduce • #seducir*
├── 🫣 *#shy • #timido*
├── 👋 *#slap • #bofetada*
├── 💤 *#sleep • #dormir*
├── 🚬 *#smoke • #fumar*
├── 🤮 *#spit • #escupir*
├── 👣 *#step • #pisar*
├── 💭 *#think • #pensar*
├── 🚶 *#walk • #caminar*
├── 😉 *#wink • #guiñar*
├── 😬 *#cringe • #avergonzarse*
├── 😎 *#smug • #presumir*
├── 😊 *#smile • #sonreir*
├── ✋ *#highfive • #5*
├── 😈 *#bully • #bullying*
├── 🤝 *#handhold • #mano*
├── 👋 *#wave • #hola*
├── 💞 *#waifu*
└── 🫶 *#ppcouple • #ppcp*
╰═✦「 ☠️ *Tokyo Ghoul Emotion System* ☠️ 」✦═╯

╭══✦〘 𝑵𝑺𝑭𝑾 〙✦══╮
│ 「 🩸 *Kaneki’s Dark Desires* 🩸 」
│ 𝘋𝘦𝘴𝘢𝘵𝘢 𝘭𝘢 𝘰𝘴𝘤𝘶𝘳𝘪𝘥𝘢𝘥 𝘲𝘶𝘦 𝘳𝘦𝘴𝘪𝘥𝘦 𝘦𝘯 𝘵𝘶 𝘮𝘦𝘯𝘵𝘦 𝘨𝘩𝘰𝘶𝘭.
│
├── 🔞 *#danbooru • #dbooru* + [tags]
├── 💮 *#gelbooru • #gbooru* + [tags]
├── 🩷 *#rule34 • #r34* + [tags]
├── 📺 *#xvideos • #xvideosdl* + [link]
└── 🎞️ *#xnxx • #xnxxdl* + [link]
╰═══✦「 ☠️ *Tokyo Ghoul NSFW System* ☠️ 」✦═══╯`

    const botname = '🏔️ 𝙆𝙖𝙣𝙚𝙠𝙞𝘽𝙤𝙩-𝙑𝟯 🎋'
    const textbot = '⚙️ 𝙳𝙴𝚂𝙰𝚁𝚁𝙾𝙻𝙻𝙰𝙳𝙾 𝙿𝙾𝚁: 𝚂𝙷𝙰𝙳𝙾𝚆 𝙲𝙾𝚁𝙴'
    const redes = 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j'
    const randomIcono = 'https://files.catbox.moe/ge2vz7.jpg'
    const channelRD = { id: '120363404182502020@newsletter', name: '┊▬ 𝘒𝘈𝘕𝘌𝘒𝘐 𝘒𝘌𝘕 ▬ ❜┊' }

    await conn.sendMessage(m.chat, {
    document: await (await fetch(banner)).buffer(),
    fileName: '^1.8.2 | Lastest 🍉',
    mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileLength: 0,
    pageCount: 1,
    caption: menu, // ✅ aquí va tu texto o menú
    contextInfo: {
      forwardingScore: 0,
      isForwarded: true,
      mentionedJid: [m.sender],
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
      },
      externalAdReply: {
        title: botname,
        body: textbot,
        mediaType: 1,
        thumbnailUrl: randomIcono,
        mediaUrl: redes,
        sourceUrl: redes,
        showAdAttribution: false,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al enviar el menú.')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's'].map(v => v.toString().padStart(2, 0)).join('')
}