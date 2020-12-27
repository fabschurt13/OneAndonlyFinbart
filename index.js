const fs = require('fs');
const { Client, Collection, Intents, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const handlerFiles = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));

for (const file of handlerFiles) {
    const handler = require(`./handlers/${file}`);
    handler.execute(client);
}

client.login(token)
    .then(token => {})
    .catch(err => console.error(`Error instantiating client: ${err}`));