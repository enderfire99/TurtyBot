const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true
}

const reactionRoleSchema = new mongoose.Schema({
    guildID: reqString, //Para saber en que guild esta pasandio
    channelID: reqString, // para saber en que canal buscar
    messageID: reqString, //para definir el mensaje si es que no creamos uno
    emojiNAME: reqString, //definimos el emoji
    action: {type: Number, require: true}, //si lo quita y agrega, agrega o elimina
    roleID: reqString // que rol va a modificar
});

reactionRoleSchema.statics.findMessage = function(guild, channel, message, emoji_name) {
    return this.find({
        guildID: new RegExp(guild, 'i'), 
        channelID: new RegExp(channel, 'i'), 
        messageID: new RegExp(message, 'i'), 
    });
}

reactionRoleSchema.statics.findGivenRole = function(guild, channel, message, emoji_name) {
    return this.find({
        guildID: new RegExp(guild, 'i'), 
        channelID: new RegExp(channel, 'i'), 
        messageID: new RegExp(message, 'i'), 
        emojiNAME: new RegExp(emoji_name, 'i')
    });
}

reactionRoleSchema.statics.findDeleteRole = function(guild, channel, message, emoji_name) {
    return this.find({
        guildID: new RegExp(guild, 'i'), 
        channelID: new RegExp(channel, 'i'), 
        messageID: new RegExp(message, 'i'), 
        emojiNAME: new RegExp(emoji_name, 'i'), 
        action: 3
    });
}

reactionRoleSchema.virtual('role').get(function() {
    return `${this.roleID}`
})

reactionRoleSchema.virtual('tipo').get(function() {
    return `${this.action}`
})

module.exports = mongoose.models.reactionRoleModels || mongoose.model("reactionRoleModels", reactionRoleSchema)