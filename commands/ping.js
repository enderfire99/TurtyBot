module.exports = {
    name: 'ping',
    description: 'returns pong',

    async execute(turty, Discord, message, args)
    {
        message.reply('pong')
    }
}