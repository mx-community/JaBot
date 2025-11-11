import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import translate from '@vitalets/google-translate-api'
import { perplexity } from '../lib/chatgpt.js'
import { Configuration, OpenAIApi } from 'openai'

const apikey_base64 = 'c2stcHJvai1tUzN4bGZueXo0UjBPWV8zbm1DVDlMQmlmYXhYbVdaa0ptUVFJMDVKR2FxdHZCbk9ncWZjRXdCbEJmMU5WN0lYa0pncVJuM3BNc1QzQmxia0ZKMVJ5aEJzUl93NzRXbll5LWdjdkowT0NQUXliWTBOcENCcDZIOTlCVVVtcWxuTjVraEZxMk43TGlMU0RsU0s1cXA5Tm1kWVZXc0E='

const apikey = Buffer.from(apikey_base64, 'base64').toString('utf-8')
const configuration = new Configuration({apiKey: apikey})
const openai = new OpenAIApi(configuration)

const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return
let resHarumi = [
'Debes ingresar el comando y escribir algo para que pueda responderte.', 
'Ingresa de nuevo el comando y escribe algo en particular para que pueda responderte. jajaja.', 
'Debes escribir algo aparte del comando jajaja, es para saber que me estas llamando.', 
'No, debes de ingresar el comando y escribir algo en particular donde pueda responderte jaja.', 
'¡Jajajaja! No, debes de usar el comando, es para llamarme y asi responderte si escribes algo en particular.'
].getRandom()
if (!text) return conn.reply(m.chat, resHarumi, m, takedaHaru)
let syms1 = await fetch('https://raw.githubusercontent.com/mx-community/mx-files/main/archivos/IAs/TakedaHarumi.txt').then((v) => v.text())
if (command == 'ia' || command == 'chatgpt') {
try {
const messages = [
{role: 'system', content: syms1},
{role: 'user', content: text}
]

const chooseModel = (query) => {
const lowerText = query.toLowerCase()

if (lowerText.includes('código') || lowerText.includes('programación') || lowerText.includes('code') || lowerText.includes('script')) {
return 'codellama-70b-instruct'
} else if (lowerText.includes('noticias') || lowerText.includes('actual') || lowerText.includes('hoy') || lowerText.includes('último')) {
return 'sonar-medium-online'
} else if (lowerText.includes('explica') || lowerText.includes('por qué') || lowerText.includes('razona') || lowerText.includes('analiza')) {
return 'sonar-reasoning-pro'
} else if (lowerText.includes('cómo') || lowerText.includes('paso a paso') || lowerText.includes('instrucciones')) {
return 'mixtral-8x7b-instruct'
} else if (lowerText.includes('charla') || lowerText.includes('habla') || lowerText.includes('dime')) {
return 'sonar-medium-chat'
} else {
return 'sonar-pro'
}
}

const selectedModel = chooseModel(text)
const fallbackModels = Object.keys(perplexity.api.models).filter((m) => m !== selectedModel)
let response = await perplexity.chat(messages, selectedModel)

if (!response.status) {
for (const fallback of fallbackModels) {
try {
response = await perplexity.chat(messages, fallback)
if (response.status) {
//console.log(`Respaldo ${fallback} funcionó`);
break
}
} catch (e) {
console.error(`Falló ${fallback}: ${e.message}`)
}
}
}

if (response.status) {
await conn.reply(m.chat, response.result.response, m, takedaHaru)
}
} catch {
try {
async function getResponse(prompt) {
try {
await delay(1000)
const response = await axios.post(
'https://api.openai.com/v1/chat/completions',
{model: 'gpt-4o-mini', messages: [{role: 'user', content: prompt}], max_tokens: 300},
{
headers: {
'Content-Type': 'application/json',
Authorization: `Bearer ${apikey}`
}
}
)
return response.data.choices[0].message.content
} catch (error) {
console.error(error)
}
}

const respuesta = await getResponse(text)
await conn.reply(m.chat, response, m, takedaHaru)
} catch {
try {
let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`)
let res = await gpt.json()
await conn.reply(m.chat, res.gpt, m, takedaHaru)

/*let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)*/
} catch {}
}
}
}

}
handler.command = ["takeda", "senpai", "sempai", "harumi", "haru"]
export default handler
