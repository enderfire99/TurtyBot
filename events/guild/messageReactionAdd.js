const reactionRoleModels = require('../../models/ReactionRoleSchema')

module.exports = async (turty, Discord, reaction, user) => {
    if (reaction.message.guild.members.cache.get(user.bot)) return;

    const pete = reaction.message.guild.members.cache.get(user.id);

    const name_emoji  = reaction.emoji.name;

    //mensaje de verificacion
    if (reaction.message.id === '921449353183383582')
    {
        //para nada mas emojis que tengan un unicode ya creado, para eso tipear \:nombre_emoji: en disc
        switch (name_emoji)
        {
            case '✅': 
                pete.roles.remove('768596250136150026');
                pete.roles.add('754562124780535853');
                break;
        }
    }

    //Colores
    if (reaction.message.id === '768981885510352976')
    {
        if (reaction.message.guild.members.cache.get(user.bot)) return;

        const pete = reaction.message.guild.members.cache.get(user.id);

        const name_emoji  = reaction.emoji.name;

        //para nada mas emojis que tengan un unicode ya creado, para eso tipear \:nombre_emoji: en disc
        switch (name_emoji)
        {
            case '🟡': 
                pete.roles.add('768978803598426134');
                break;

            case '🟠': 
                pete.roles.add('768978884027744286');
                break;

            case '🔴': 
                pete.roles.add('768979201440088065');
                break;

            case '🌹': 
                pete.roles.add('768979480076222495');
                break;

            case '🟣': 
                pete.roles.add('768979050060185630');
                break;

            case '🔵': 
                pete.roles.add('768664959357419540');
                break;

            case '🌊': 
                pete.roles.add('768979908675239998');
                break;

            case '⚫': 
                pete.roles.add('768980008009072663');
                break;

            case '🟢': 
                pete.roles.add('768988448744013934');
                break;

            case '⬜': 
                pete.roles.add('768979786592157767');
                break;

        }
    }

    //roles adicionales
    if (reaction.message.id === '865797626636664852')
    {
        if (reaction.message.guild.members.cache.get(user.bot)) return;

        const pete = reaction.message.guild.members.cache.get(user.id);

        const name_emoji  = reaction.emoji.name;

        //para emojis perso con nada mas agregar el nombre esta
        switch (name_emoji)
        {
            case 'LOL':
                pete.roles.add('783439304524693514');
                break;

            case 'lofimusic':
                pete.roles.add('783439342650654771');
                break;

            case 'Genshinicon':
                pete.roles.add('789159347694993459');
                break;

            case 'bochiwaifu:865763531575132170':
                pete.roles.add('772654571439915069');
                break;
        }
    }

    //reaction roles 
    guild_id = reaction.message.guild.id;
    channel_id = reaction.message.channel.id;
    message_id = reaction.message.id;
    reaction_name = reaction.emoji.name;

    console.log(`guild: ${guild_id} | channel: ${channel_id} | message: ${message_id} | emoji_name: ${reaction_name}`);

    const reactionRole = await reactionRoleModels.findGivenRole(guild_id, channel_id, message_id, reaction_name);

    if (reactionRole.length > 0){
        const usuario = reaction.message.guild.members.cache.get(user.id);

        for(i = 0; i < reactionRole.length; i++){
            switch(reactionRole[i].tipo){
                case '1':
                    usuario.roles.add(`${reactionRole[i].role}`)
                    break;
                
                case '2':
                    usuario.roles.remove(`${reactionRole[i].role}`)
                    break
                
                case '3':
                    usuario.roles.add(`${reactionRole[i].role}`)
                    break
            }
        }
    }
    else{
        const reaction_on_message = await reactionRoleModels.findGivenRole(guild_id, channel_id, message_id);

        if (reaction_on_message.length > 0){
            reaction.remove()
        }
    }
}