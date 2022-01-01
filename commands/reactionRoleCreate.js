const reactionRoleSchema = require("../models/reactionRoleSchema");

module.exports = {
    name: 'reactionRoleCreate',
    alias: ['rrc', 'reactionrolecreate'],
    description: 'crear nuevo reaction role',

    async execute(turty, Discord, message, args, reactionRoleSchema)
    {
        message.channel.send('en que canal esta su mensaje')
    }
}