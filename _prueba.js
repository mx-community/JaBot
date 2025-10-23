import fs from 'fs'
import path from 'path'
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

function revisarPlugins() {
  const pluginsDir = './plugins'
  if (!fs.existsSync(pluginsDir)) return logger.warn('Carpeta de plugins no encontrada.')

  const archivos = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))

  logger.info(`🧩 Escaneando ${archivos.length} plugins...`)

  for (const file of archivos) {
    const ruta = path.join(pluginsDir, file)
    try {
      const contenido = fs.readFileSync(ruta, 'utf8')
      new Function(contenido)()
      logger.success(`✅ ${file} cargado correctamente`)
    } catch (err) {
      logger.error(`❌ Error en plugin "${file}": ${err.message}`)
    }
  }
}

function revisarHandler() {
  const handlerPath = './handler.js'
  if (!fs.existsSync(handlerPath)) return logger.warn('Archivo handler.js no encontrado.')

  try {
    const handlerCode = fs.readFileSync(handlerPath, 'utf8')
    new Function(handlerCode)()
    logger.success('✅ Handler cargado sin errores')
  } catch (err) {
    logger.error(`❌ Error en handler.js: ${err.message}`)
  }
}

console.log(chalk.magentaBright('\n╭━━━〔 ⚙ KANEKI BOT AI ⚙ 〕━━━⬣'))
console.log(chalk.greenBright('┃ 🚀 Consola avanzada iniciada correctamente'))
console.log(chalk.cyanBright('┃ 🕒 Hora actual: ') + chalk.white(moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')))
console.log(chalk.yellowBright('┃ 🔍 Revisando archivos y errores...'))
console.log(chalk.magentaBright('╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣\n'))

revisarHandler()
revisarPlugins()

fs.watch('./plugins', (event, filename) => {
  if (filename && filename.endsWith('.js')) {
    logger.event(`📂 Cambio detectado en: ${filename}`)
    revisarPlugins()
  }
})