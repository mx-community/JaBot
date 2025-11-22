import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = "" //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
"5493873655135",
"5493873579805"
]

global.suittag = ["5493873655135"] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = "Baileys Multi Device"
global.vs = "^2.3.5"
global.nameqr = "ᴋᴀɴᴇᴋɪ-ʙᴏᴛ.ᴍᴅ"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.alanWasock = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.dev = "Alan.Js"
global.author = "@mx-community"
global.etiqueta = "@mx-support"
global.currency = "Monedas"
global.currency2 = "Puntos"
global.banner = "https://qu.ax/XPDQK.jpg"
//global.icono = "https://i.pinimg.com/originals/b3/67/d5/b367d513d861de468305c32c6cd22756.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.ch = {
ch1: "120363318353263389@newsletter"
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
lolhuman: {url: 'https://api.lolhuman.xyz/api', key: 'GataDiosV3'},
stellar: {url: 'https://api.stellarwa.xyz', key: 'GataDios'},
skizo: {url: 'https://skizo.tech/api', key: 'GataDios'},
alyachan: {url: 'https://api.alyachan.dev/api', key: null},
exonity: {url: 'https://exonity.tech/api', key: 'GataDios'},
ryzendesu: {url: 'https://api.ryzendesu.vip/api', key: null},
neoxr: {url: 'https://api.neoxr.eu/api', key: 'GataDios'},
davidcyriltech: {url: 'https://api.davidcyriltech.my.id', key: null},
dorratz: {url: 'https://api.dorratz.com', key: null},
siputzx: {url: 'https://api.siputzx.my.id/api', key: null},
vreden: {url: 'https://api.vreden.web.id/api', key: null},
fgmods: {url: 'https://api.fgmods.xyz/api', key: 'elrebelde21'},
popcat: {url: 'https://api.popcat.xyz', key: null}
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'configXD.js'"))
import(`${file}?update=${Date.now()}`)
})
