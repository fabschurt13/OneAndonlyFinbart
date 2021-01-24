const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guilds, token } = require('./configs/config.json');

const commandDirs = fs.readdirSync('./commands');
const commands = [];

for (const dir of commandDirs){
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '9' }).setToken(token);

guilds.forEach(guild => {
    rest.put(Routes.applicationGuildCommands(clientId, guild), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
});
