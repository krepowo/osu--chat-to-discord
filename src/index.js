const { BanchoClient } = require('bancho.js')
const { Client } = require('oceanic.js')
const { EmbedBuilder } = require('@oceanicjs/builders')
const osu = require('node-osu')

const config = require('../config.json')

const osuapi = new osu.Api(config['auth_osu!'].apikey)
const bancho = new BanchoClient({ username: config['auth_osu!'].username, password: config['auth_osu!'].password, apiKey: config['auth_osu!'].apikey })
const discord = new Client({ auth: "Bot " + config.discord_auth.token, gateway: { intents: ['ALL'] } })


bancho.on("PM", async (msg) => {
    const orang = msg.user.ircUsername
    await osuapi.getUser({ u: orang }).then(async obj => {
        let embed = new EmbedBuilder()
            .setAuthor(`${orang}: ${parseInt(obj.pp.raw).toFixed(2)} (#${obj.pp.rank} ${obj.country}${obj.pp.countryRank})`, `https://assets.ppy.sh/old-flags/${obj.country}.png`, `https://osu.ppy.sh/users/${obj.id}`)
            .setThumbnail(`https://a.ppy.sh/${obj.id}`).setColor(convertColor('#2ec36e'))
            .setFooter(`in ${msg.channel.name}`).setTimestamp("now")

        let embed2 = new EmbedBuilder()

        if (msg.content.includes('ACTION')) {
            let text = msg.content.replace('ACTION', '').trim()
            embed.setDescription(text)
            return
            let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
            let beatmap = msg.content.match(urlRegex)[0].split('beatmapsets/')[1]
            console.log(beatmap)
            osuapi.getBeatmaps({ b: beatmap }).then(map => {
                let aw = map[0]
                let creatorid;
                osuapi.getUser({ u: aw.createMessage }).then(u => creatorid = u.id)
                embed2.setAuthor(`Mapped by ${aw.creator}`, `https://a.ppy.sh/${creatorid}`, `https://osu.ppy.sh/users/${creatorid}`).setTitle(`${aw.artist} - ${aw.title}`)
                    .addField('BPM', aw.bpm).addField('Star rating', aw.rating + "⭐").addField('Status', aw.approvalStatus)
                    .setTimestamp('now').setColor(convertColor('#2ec36e'))
            })
        } else {
            embed.setDescription(msg.content)
        }
        if (msg.content.includes('https://osu.ppy.sh/ss/')) {
            let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
            let ssurl = msg.content.match(urlRegex)[0]
            embed.setImage(ssurl)
        }

        let ch = discord.getChannel(config.discord_channel.osu_global)
        ch.createMessage({ embeds: [embed.toJSON(), embed2.toJSON()] })
    })
})

bancho.on('CM', async (msg) => {
    if (msg.channel.name == "#osu") {
        const orang = msg.user.ircUsername
        await osuapi.getUser({ u: orang }).then(async obj => {
            let embed = new EmbedBuilder()
                .setAuthor(`${orang}: ${parseInt(obj.pp.raw).toFixed(2)}pp (#${obj.pp.rank} ${obj.country}${obj.pp.countryRank})`, `https://assets.ppy.sh/old-flags/${obj.country}.png`, `https://osu.ppy.sh/users/${obj.id}`)
                .setThumbnail(`https://a.ppy.sh/${obj.id}`).setColor(convertColor('#2ec36e'))
                .setFooter(`in ${msg.channel.name}`).setTimestamp("now")

            let embed2 = new EmbedBuilder()

            if (msg.content.includes('ACTION')) {
                let text = msg.content.replace('ACTION', '').trim()
                embed.setDescription(text)
                return
                let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                let beatmap = msg.content.match(urlRegex)[0].split('beatmapsets/')[1]
                console.log(beatmap)
                osuapi.getBeatmaps({ b: beatmap }).then(map => {
                    let aw = map[0]
                    let creatorid;
                    osuapi.getUser({ u: aw.createMessage }).then(u => creatorid = u.id)
                    embed2.setAuthor(`Mapped by ${aw.creator}`, `https://a.ppy.sh/${creatorid}`, `https://osu.ppy.sh/users/${creatorid}`).setTitle(`${aw.artist} - ${aw.title}`)
                        .addField('BPM', aw.bpm).addField('Star rating', aw.rating + "⭐").addField('Status', aw.approvalStatus)
                        .setTimestamp('now').setColor(convertColor('#2ec36e'))
                })
            } else {
                embed.setDescription(msg.content)
            }
            if (msg.content.includes('https://osu.ppy.sh/ss/')) {
                let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                let ssurl = msg.content.match(urlRegex)[0]
                embed.setImage(ssurl)
            }

            if (!embed2.toJSON().author) {
                let ch = discord.getChannel(config.discord_channel.osu_global)
                ch.createMessage({ embeds: [embed.toJSON()] })
            } else {
                let ch = discord.getChannel(config.discord_channel.osu_global)
                ch.createMessage({ embeds: [embed.toJSON(), embed2.toJSON()] })
            }
        })
    }

    if (msg.channel.name == "#indonesian") {
        const orang = msg.user.ircUsername
        await osuapi.getUser({ u: orang }).then(async obj => {
            let embed = new EmbedBuilder()
                .setAuthor(`${orang}: ${parseInt(obj.pp.raw).toFixed(2)}pp (#${obj.pp.rank} ${obj.country}${obj.pp.countryRank})`, `https://assets.ppy.sh/old-flags/${obj.country}.png`, `https://osu.ppy.sh/users/${obj.id}`)
                .setThumbnail(`https://a.ppy.sh/${obj.id}`).setColor(convertColor('#2ec36e'))
                .setFooter(`in ${msg.channel.name}`).setTimestamp("now")

            let embed2 = new EmbedBuilder()

            if (msg.content.includes('ACTION')) {
                let text = msg.content.replace('ACTION', '').trim()
                embed.setDescription(text)
                return
                let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                let beatmap = msg.content.match(urlRegex)[0].split('beatmapsets/')[1]
                console.log(beatmap)
                osuapi.getBeatmaps({ b: beatmap }).then(map => {
                    let aw = map[0]
                    let creatorid;
                    osuapi.getUser({ u: aw.createMessage }).then(u => creatorid = u.id)
                    embed2.setAuthor(`Mapped by ${aw.creator}`, `https://a.ppy.sh/${creatorid}`, `https://osu.ppy.sh/users/${creatorid}`).setTitle(`${aw.artist} - ${aw.title}`)
                        .addField('BPM', aw.bpm).addField('Star rating', aw.rating + "⭐").addField('Status', aw.approvalStatus)
                        .setTimestamp('now').setColor(convertColor('#2ec36e'))
                })
            } else {
                embed.setDescription(msg.content)
            }
            if (msg.content.includes('https://osu.ppy.sh/ss/')) {
                let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                let ssurl = msg.content.match(urlRegex)[0]
                embed.setImage(ssurl)
            }

            if (!embed2.toJSON().author) {
                let ch = discord.getChannel(config.discord_channel.osu_indo)
                ch.createMessage({ embeds: [embed.toJSON()] })
            } else {
                let ch = discord.getChannel(config.discord_channel.osu_indo)
                ch.createMessage({ embeds: [embed.toJSON(), embed2.toJSON()] })
            }
        })

        if (msg.channel.name == "#lobby") {
            const orang = msg.user.ircUsername
            await osuapi.getUser({ u: orang }).then(async obj => {
                let embed = new EmbedBuilder()
                    .setAuthor(`${orang}: ${parseInt(obj.pp.raw).toFixed(2)}pp (#${obj.pp.rank} ${obj.country}${obj.pp.countryRank})`, `https://assets.ppy.sh/old-flags/${obj.country}.png`, `https://osu.ppy.sh/users/${obj.id}`)
                    .setThumbnail(`https://a.ppy.sh/${obj.id}`).setColor(convertColor('#2ec36e'))
                    .setFooter(`in ${msg.channel.name}`).setTimestamp("now")

                let embed2 = new EmbedBuilder()

                if (msg.content.includes('ACTION')) {
                    let text = msg.content.replace('ACTION', '').trim()
                    embed.setDescription(text)

                    return
                    let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                    let beatmap = msg.content.match(urlRegex)[0].split('beatmapsets/')[1]
                    console.log(beatmap)
                    osuapi.getBeatmaps({ b: beatmap }).then(map => {
                        let aw = map[0]
                        let creatorid;
                        osuapi.getUser({ u: aw.createMessage }).then(u => creatorid = u.id)
                        embed2.setAuthor(`Mapped by ${aw.creator}`, `https://a.ppy.sh/${creatorid}`, `https://osu.ppy.sh/users/${creatorid}`).setTitle(`${aw.artist} - ${aw.title}`)
                            .addField('BPM', aw.bpm).addField('Star rating', aw.rating + "⭐").addField('Status', aw.approvalStatus)
                            .setTimestamp('now').setColor(convertColor('#2ec36e'))
                    })
                } else {
                    embed.setDescription(msg.content)
                }
                if (msg.content.includes('https://osu.ppy.sh/ss/')) {
                    let urlRegex = /^(https?:\/\/[^/]+(\/[\w-]+)+)/
                    let ssurl = msg.content.match(urlRegex)[0]
                    embed.setImage(ssurl)
                }

                if (!embed2.toJSON().author) {
                    let ch = discord.getChannel(config.discord_channel.osu_lobby)
                    ch.createMessage({ embeds: [embed.toJSON()] })
                } else {
                    let ch = discord.getChannel(config.discord_channel.osu_lobby)
                    ch.createMessage({ embeds: [embed.toJSON(), embed2.toJSON()] })
                }

            })
        }
    }
})


bancho.on('connected', () => {
    console.log('[BANCHO] Client connected!')
})
bancho.on('disconnected', (error) => {
    console.log('[BANCHO] Client disconnected, reason: ' + error)
    bancho.connect().then(() => {
        config['osu!_channel'].forEach(ch => bancho.getChannel(ch).join())
    })
})

discord.on('ready', () => {
    console.log("[DISCORD] Bot is online!")
})
discord.on('disconnect', () => {
    discord.connect()
})


bancho.connect().then(() => {
    config['osu!_channel'].forEach(ch => bancho.getChannel(ch).join())
})
discord.connect()

process.on('unhandledRejection', (error, promise) => {
    console.error(`Unhandled rejection: ${promise}, \n ${error}`)
})

function convertColor(color) {
    let hasil
    const HEX_REGEX = /^#?([a-fA-F0-9]{6})$/;
    const match = color.match(HEX_REGEX);
    if (!match) throw new Error('Invalid color');
    hasil = parseInt(match[1], 16);
    return hasil
} 