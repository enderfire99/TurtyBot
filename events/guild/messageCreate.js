require('dotenv').config();

module.exports = (turty, Discord, message) => {
    const prefix = process.env.PREFIX

    if(message.author.bot) return;

    //Con esto podemos entrar a los datos del mensaje
    //console.log(`en el canal ${message.channel.name} el usuario ${message.author.tag} mando el sig mensaje: ${message.content} y empieza con ${message.content.startsWith()}`)

    if (message.content.toLowerCase() === "hello there")
    {
        var grievous = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Turty")
        .setImage("https://c.tenor.com/h8ESfI_EBaQAAAAC/star-wars-general-grievous.gif");

        //SI O SI USAR ESTO AL MANDAR EMBEDS PELOTUDO
        message.channel.send({ embeds: [grievous] });
    }

    if (message.content.toLowerCase() === "holi turty")
    {
        if(message.author == process.env.SOFI_ID)
        {
            //message.reply("Holi creadora")

            var saludo = new Discord.MessageEmbed()
            .setColor([127, 255, 212])
            .setTitle("CREADORAAAAAAA")
            .setAuthor("Turty")
            .setImage("https://c.tenor.com/1hdsn62I4tkAAAAS/turtle-cute.gif");

            message.reply({embeds: [saludo]});
        }
        else if(message.author == process.env.IO_ID)
        {
            //message.reply("Holi creador")

            var saludo = new Discord.MessageEmbed()
            .setColor([244, 70, 17])
            .setTitle("CREADORRRRRR")
            .setAuthor("Turty")
            .setImage("https://c.tenor.com/1hdsn62I4tkAAAAS/turtle-cute.gif");

            message.reply({embeds: [saludo]});
        }
        else
        {
            message.reply("Hola pete");
        }
    }

    if (message.content.toLowerCase() === "te odio turty")
    {
        if(message.author == process.env.SOFI_ID)
        {
            message.reply("Yo te amo UwU");
        }
        else if(message.author == process.env.IO_ID)
        {
            message.reply("Yo te amo UwU");
        }
        else
        {
        
            var lightsaber = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("YO TE ODIO MAS HDRP")
            .setAuthor("Turty")
            .setImage("https://c.tenor.com/kG-05sjI6hoAAAAC/turtles-fighting.gif");

            message.reply({embeds: [lightsaber]});
        }
    }   

    if (message.content.toLowerCase() === "feliz navidad turty")
    {
        if (message.author  == process.env.IO_ID || message.author == process.env.SOFI_ID) 
        {
            message.channel.send(`FELIZ NAVIDAD A TODOSSSSSSS! @everyone`);
        }
        else
        {
            message.channel.send(`vos no pete`);
        }
    }

    if (message.content.toLowerCase() === "feliz año turty")
    {
        if (message.author  == process.env.IO_ID || message.author == process.env.SOFI_ID) 
        {
            message.channel.send(`FELIZ 2022 A TODOSSSSSSS! @everyone`);
        }
        else
        {
            message.channel.send(`vos no pete`);
        }
    }
    
    //COMMANDS
    if(message.content.startsWith(prefix))
    {
        //console.log('llego?')

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = turty.commands.get(cmd);

        if(command) command.execute(turty, Discord, message, args);
    }
}