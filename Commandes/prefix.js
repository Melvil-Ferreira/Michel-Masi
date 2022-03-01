const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

    name: "prefix",
    description: "Permet de changer le préfixe du bot",
    utilisation: "prefix",
    alias: ["ping"],
    permission: "Aucune",
    category: "Système",

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {

            let prefix = args[0];
            if(!prefix) return message.reply("Veuillez indiquer un préfixe")

            const ancienprefix = req[0].prefix;

            db.query(`UPDATE serveur SET prefix = '${prefix}' WHERE guildID = ${message.guild.id}`)

            message.reply(`Vous avez modifié le préfixe, c'est pasé de \`${ancienprefix}\` à \`${prefix}\` !`)
        })
    }
})