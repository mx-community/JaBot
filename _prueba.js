import chalk from 'chalk'
import moment from 'moment-timezone'

const log = console.log
console.log = (...args) => {
  const time = chalk.gray(`[${moment().tz('America/Lima').format('HH:mm:ss')}]`)
  log(time, ...args)
}

process.on('uncaughtException', err => {
  console.error(chalk.redBright(`\n🚨 ERROR NO CAPTURADO 🚨\n${err.stack || err}`))
})

process.on('unhandledRejection', err => {
  console.error(chalk.redBright(`\n💥 PROMESA RECHAZADA 💥\n${err.stack || err}`))
})

global.logger = {
  info: (...msg) => log(chalk.cyanBright('[INFO]'), ...msg),
  success: (...msg) => log(chalk.greenBright('[✔ ÉXITO]'), ...msg),
  warn: (...msg) => log(chalk.yellowBright('[⚠ ADVERTENCIA]'), ...msg),
  error: (...msg) => log(chalk.redBright('[❌ ERROR]'), ...msg),
  event: (...msg) => log(chalk.magentaBright('[⚡ EVENTO]'), ...msg)
}

console.log(chalk.magentaBright('\n╭━━━〔 ⚙ KANEKI BOT AI ⚙ 〕━━━⬣'))
console.log(chalk.greenBright('┃ 🚀 Consola avanzada cargada correctamente'))
console.log(chalk.cyanBright('┃ 🕒 Hora actual: ') + chalk.white(moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')))
console.log(chalk.yellowBright('┃ 📦 Listo para iniciar el bot...'))
console.log(chalk.magentaBright('╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣\n'))