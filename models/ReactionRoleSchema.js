const mongoose = require('mongoose')

const reqString = 'type: String, required: true'

const reactionRolesSchema = new mongoose.Schema({
    guildID: {reqString}, //Para saber en que guild esta pasandio
    messageID: {reqString}, //para definir el mensaje si es que no creamos uno
    emojiID: {reqString}, //definimos el emoji
    action: {reqString}, //si lo quita y agrega, agrega o elimina
    roleID: {reqString} // que rol va a modificar
})

const model = mongoose.model("ReactionRolesModels", reactionRolesSchema)

module.exports = model;