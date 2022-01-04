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

        const collector_channel = message.channel.createMessageCollector({
            filter, time: 1000 * 20, max: 1
        })

        collector_channel.on('collect', m => console.log(`Collected ${m.content} \n`));

        collector_channel.on('end', collected => {
            if(collected.size == 0) message.channel.send("time out")

            collected.forEach(message => {
                if (message.guild.channels.cache.has(message.content))
                {
                    id_channel = message.guild.channels.cache.get(message.content);

                    message.channel.send('selecciono su canal, que mensaje es?')

                    const collector_msg = message.channel.createMessageCollector({
                        filter, time: 1000 * 20, max: 1
                    })
            
                    collector_msg.on('collect', m => console.log(`Collected ${m.content} \n`));
            
                    collector_msg.on('end', collected => {
                        if(collected.size == 0) message.channel.send("time out")

                        msg_error = true;

                        collected.forEach(async message => {
                            await id_channel.messages.fetch(message.content).then(
                                message => {
                                    id_message = message.content;
                                }
                            ).catch(async () => {
                                console.error;
                                msg_error = false;
                                await message.channel.send('no existe');
                                
                            });

                            if (msg_error)
                            {
                                message.channel.send('selecciono su mensaje, que emoji necesita??')
                            }
                        });
                    });
                }
                else{
                    message.channel.send("eso no es un canal");
                }
            });
        });
    }
}