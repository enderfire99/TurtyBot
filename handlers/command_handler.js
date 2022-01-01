const fs = require('fs');

module.exports = (turty, Discord) =>{
    const commands_files = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));

    for(const file of commands_files)
    {
        const command = require(`../commands/${file}`);

        if (command.name)
        {
            turty.commands.set(command.name, command);
        }
        else
        {
            console.log(`se uso commando name: ${command.name}`)
            continue;
        }
    }
}