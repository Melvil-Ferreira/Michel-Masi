const Discord = require("discord.js");
const mysql = require("mysql")
const fs = require("fs");
const intents = new Discord.Intents(32767);
const Command = require("./Command");
const Database = require("./Database");
const Event = require("./Event");

class Client extends Discord.Client {
  constructor() {
    super({ intents });

    /**
     * @type {Discord.Collection<string, Command>}
     */

    this.commands = new Discord.Collection();
    this.db = Database;
    this.color = "#757575";
  }

  start(token) {
    fs.readdirSync("./Commandes")
      .filter((file) => file.endsWith(".js"))
      .forEach(async (f) => {
        /**
         * @type {Command}
         */

        let props = require(`../Commandes/${f}`);
        console.log(`${f} commande chargée avec succès !`);
        this.commands.set(props.name, props);
      });

    fs.readdirSync("./Events/").forEach((dirs) => {
      fs.readdirSync(`./Events/${dirs}/`)
        .filter((files) => files.endsWith(".js"))
        .forEach(async (evt) => {
          /**
           * @type {Event}
           */

          const event = require(`../Events/${dirs}/${evt}`);
          console.log(`${event.event}.js événement chargé avec succès !`);
          this.on(event.event, event.run.bind(null, this));
        });
    });
    this.login(token);
  }
}

module.exports = Client;
