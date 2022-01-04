//pide las variables de nuestro archivo dotenv for enviromental variable(TOKEN DE BOT)
require('dotenv').config();

//hace que pueda leer 
const fs = require('fs');
const mongoose = require('mongoose');

//de esta libreria hace q agreguemos discordjs a la variable Discord
//const Discord = require('discord.js');

//esto nada mas agrega importa las clases que queramos de discord js
const Discord = require('discord.js');
//client permite interactuar con discord api basically

//aplicamos client a nuestro bot
const turty = new Discord.Client({ 
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS'], 
    partials: ['MESSAGE', 'REACTION', 'USER', 'CHANNEL']
});

//procesar futuros commandos con prefix #
turty.commands = new Discord.Collection();

//procesar events
turty.events = new Discord.Collection();

//para cada procesador vamos a chequear que existe

['command_handler', 'event_handler'].forEach(handler => 
{
    //con este comando y si es que existe le pasamos turty y discord
    require(`./handlers/${handler}`)(turty, Discord);
});

mongoose.connect(process.env.MONGO_CONNECT).then(() =>
{
    console.log('turty esta conectado con MONGO');
}).catch((err) => 
{
    console.log(process.env.MONGO_CONNECT)
    console.log(err);
});


//Hace que el bot se pueda unir a discord por su token
turty.login(process.env.DISCORDJS_BOT_TOKEN);