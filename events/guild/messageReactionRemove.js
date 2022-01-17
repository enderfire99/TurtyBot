const reactionRoleModels = require('../../models/ReactionRoleSchema')

module.exports = async (turty, Discord, reaction, user) =>
{
    if (reaction.message.guild.members.cache.get(user.bot)) return;

    //reaction roles 
    guild_id = reaction.message.guild.id;
    channel_id = reaction.message.channel.id;
    message_id = reaction.message.id;
    reaction_name = reaction.emoji.name;

    console.log(`guild: ${guild_id} | channel: ${channel_id} | message: ${message_id} | emoji_name: ${reaction_name}`);

    const reactionRole = await reactionRoleModels.findDeleteRole(guild_id, channel_id, message_id, reaction_name);

    if (reactionRole.length > 0){
        const usuario = reaction.message.guild.members.cache.get(user.id);

        for(i = 0; i < reactionRole.length; i++){
            usuario.roles.remove(`${reactionRole[i].role}`)
        }
    }
}