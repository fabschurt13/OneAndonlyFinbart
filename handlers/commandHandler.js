const fs = require('fs');

module.exports = {
    name: 'commandHandler',
    execute(client){
        const fs = require('fs');
        const { Collection } = require('discord.js');

        client.commands = new Collection();
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
        }
    }
}