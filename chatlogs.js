require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client({ partials: ['MESSAGE'] });

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} logged in.`);
});

client.on('messageDelete', message => {
    if(!message.partial) {
        const channel = client.channels.cache.get('679017763104096266');
        if(channel) {
            const embed = new MessageEmbed()
                .setTitle('Chatlogs')
                .addField('Author', `${message.author.tag} (${message.author.id})`, true)
                .addField('Message deleted in:', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp();
            channel.send(embed);
        }
    }
});