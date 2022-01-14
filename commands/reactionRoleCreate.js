require('dotenv').config();

const reactionRoleSchema = require("../models/reactionRoleSchema");



module.exports = {
    name: 'reactionrolecreate',
    alias: ['rrc', 'reactionrolecreate'],
    description: 'crear nuevo reaction role',

    

    async execute(turty, Discord, message, args, reactionRoleSchema)
    {
        message.channel.send('en que canal esta su mensaje')

        const filter = m => {
            return m.author.id === message.author.id;
        }

        const emoji_filter = (user) => {
            return user.id === message.author.id;
        }

        const collector_channel = message.channel.createMessageCollector({ filter, time: 1000 * 20, max: 1 });

        collector_channel.on('collect', m => console.log(`Collected ${m.content} \n`));

        collector_channel.on('end', async collected => {
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
                        if(collected.size == 0) message.channel.send("time out");
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

                            id_message = message.content;
                            
                            if (msg_error)
                            {
                                message.channel.send('selecciono su mensaje, reaccionar a su anterior mensaje con el emoji que va a usar')

                                const emoji_collector = message.createReactionCollector({ emoji_filter, time: 15000, max: 1});

                               emoji_error  = true;

                                emoji_collector.on('collect', (reaction, user) => {
                                    console.log(`emoji Collected ${reaction.emoji.name} from ${user.tag}`);
                                });

                                emoji_collector.on('end', async collected => {
                                    if (collected.size == 0) message.channel.send("time out")

                                    collected.forEach(async collected => {
                                        await message.guild.emojis.fetch(collected.emoji.id).then(emoji => {
                                            id_emoji = emoji.id;
                                        }).catch(async () => {
                                            console.error;
                                            emoji_error = false;
                                            await message.channel.send('no existe');
                                        });

                                        id_emoji = collected.emoji.name;
                                    
                                        if(emoji_error)
                                        {
                                            await message.react('🇦');
                                            await message.react('🇧');
                                            await message.react('🇨'); 

                                            await message.channel.send('selecciono su emoji, accion A dar, accion B borrar, accion C ambas');

                                            const action_filter = (reaction, user) => {
                                                return (reaction.emoji.name == '🇦' || reaction.emoji.name == '🇧' || reaction.emoji.name == '🇨') && !user.bot && user.id === message.author.id;
                                            }

                                            const action_collector = message.createReactionCollector({ action_filter, time: 15000, max: 1});

                                            action_collector.on('collect', (reaction, user) => {
                                                console.log(`emoji for action Collected ${reaction.emoji.name} from ${user.tag}`);
                                            });

                                            action_collector.on('end', async collected => {
                                                if (collected.size == 0) message.channel.send("time out")
                                                
                                                collected.forEach(async collected => {
                                                    await message.guild.emojis.fetch(collected.emoji.id).then(emoji => {
                                                        action_emoji = emoji.name;
                                                    }).catch(async () => {
                                                        console.error;
                                                        action_error = false;
                                                        await message.channel.send('no existe');
                                                    });

                                                    switch(collected.emoji.name)
                                                    {
                                                        case '🇦':
                                                            message.channel.send("accion dar")
                                                            id_action = 1;
                                                            break;
                                                        case '🇧':
                                                            message.channel.send("accion borrar")
                                                            id_action = 2;
                                                            break;
                                                        case '🇨':
                                                            message.channel.send("accion dar/borrar")
                                                            id_action = 3;
                                                            break;
                                                        default:
                                                            console.log("error");
                                                    }

                                                    if(id_action === 1 || id_action === 2 || id_action === 3)
                                                    {
                                                        message.channel.send('envie el id del rol que quiere');

                                                        const collector_channel = message.channel.createMessageCollector({ filter, time: 1000 * 20, max: 1 });

                                                        collector_channel.on('collect', m => console.log(`Collected ${m.content} \n`));

                                                        collector_channel.on('end', async collected => {
                                                            if(collected.size == 0) message.channel.send("time out")

                                                            rol_error = true;

                                                            collected.forEach(message => {
                                                                message.guild.roles.fetch(message.content).then( role => {
                                                                    id_rol = message.content;
                                                                }).catch(() => {
                                                                    console.error;
                                                                    rol_error = false;
                                                                    message.channel.send('no existe el rol');
                                                                });
                                                                
                                                                id_rol = message.content;

                                                                if(rol_error)
                                                                {
                                                                    message.channel.send(`guild: ${message.guild.id} | channel: ${id_channel} | message: ${id_message} | emoji: ${id_emoji} | action: ${id_action} | rol: ${id_rol}`)
                                                                    console.log(`guild: ${message.guild.id} | channel: ${id_channel} | message: ${id_message} | emoji: ${id_emoji} | action: ${id_action} | rol: ${id_rol}`)
                                                                }
                                                            });
                                                        });
                                                    }
                                                    else
                                                    {
                                                        message.channel.send('no esta bien el emoji')
                                                    }
                                                });
                                            });
                                        } 
                                    });
                                });
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