const reactionRoleSchema = require("../models/reactionRoleSchema");



module.exports = {
    name: 'reactionrolecreate',
    alias: ['rrc', 'reactionrolecreate'],
    description: 'crear nuevo reaction role',

    

    async execute(turty, Discord, message, args, reactionRoleSchema)
    {
        message.channel.send('en que canal esta su mensaje')

        const filter = m => {
            return m.author.id === message.author.id
        }

        const collector = message.channel.createMessageCollector({
            filter, time: 1000 * 20, max: 1
        })

        collector.on('collect', m => console.log(`Collected ${m.content} \n`));

        collector.on('end', collected => {
            collected.forEach(message => {
                if (message.guild.channels.cache.has(message.content))
                {
                    message.channel.send('existe')
                }
                else
                {
                    message.channel.send('no existe')
                }
            });
        });
    }
}