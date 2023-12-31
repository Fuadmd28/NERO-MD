import { canLevelUp, xpRange } from '../lib/levelling.js'
let handler = async (m, { conn }) => {
	  let name = conn.getName(m.sender)
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `
┌───⊷ *LEVEL*
▢ Nama : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*
└──────────────

Anda hilang *${max - user.exp}* dari *XP* untuk naik level
`.trim()
try {
  let imgg = 'https://i.ibb.co/c8Vvcrm/level-up-nero-nx.jpg'

    conn.sendFile(m.chat, imgg, 'level.jpg', txt, m)
} catch (e) {
    m.reply(txt)
}
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
    	user.role = global.rpg.role(user.level).name

        let str = `
┌─⊷ *LEVEL UP*
▢ Tingkat sebelumnya : *${before}*
▢ Level saat ini : *${user.level}*
▢ Role : *${user.role}*
└──────────────

*_Semakin banyak Anda berinteraksi dengan bot, semakin tinggi level Anda._*
`.trim()
        try {
            let img = 'https://i.ibb.co/c8Vvcrm/level-up-nero-nx.jpg'
      conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['econ']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 

export default handler