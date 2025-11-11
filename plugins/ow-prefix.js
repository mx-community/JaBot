const handler = async (m, {conn}) => {
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
conn.sendMessage(m.chat, { text: `✓  El prefijo fue restablecido por defecto con exito.` }, { quoted: m });
};
handler.help = ['resetprefix'];
handler.tags = ['owner'];
handler.command = ['reprefix'];
handler.owner = true;

export default handler;