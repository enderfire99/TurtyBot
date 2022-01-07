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
})

const model = mongoose.model("reactionRoleModels", reactionRoleSchema)

module.exports = model;