const fs = require('fs');

module.exports = {
    name: 'commandHandler',
    execute(client){
        const fs = require('fs');
        const { Collection } = require('discord.js');

        client.commands = new Collection();

        const commandDirs = fs.readdirSync('./commands');
        const commands = [];

        for (const dir of commandDirs){
            const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${dir}/${file}`);
                client.commands.set(command.data.name, command);
            }
        }
    }
}