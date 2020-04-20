const { Client, RichEmbed } = require("discord.js");
const { config } = require("dotenv");
const { getMember } = require("./functions.js");

const client = new Client({
    disableEveryone: true
})

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "⌗ 𝐅𝐀𝐄𝐑𝐈𝐄 ✯ ┊ ✧ WIP ;",
            type: "STREAMING",
            url:"https://twitch.tv/your/stream/here"      
        }
    }); 
})

client.on("message", async message => {
    const prefix = "f!";

    // If the author's a bot, return
    // If the message was not sent in a server, return
    // If the message doesn't start with the prefix, return
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // Arguments and command variable
    // cmd is the first word in the message, aka the command
    // args is an array of words after the command
    // !say hello I am a bot
    // cmd == say (because the prefix is sliced off)
    // args == ["hello", "I", "am", "a", "bot"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        // Send a message
        const msg = await message.channel.send(`🏓 Pinging....`);

        // Edit the message
        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
    }

      
    if (cmd === "say") {
        // Check if you can delete the message
        if (message.deletable) message.delete();
        if (message.author.id == '695138655106367608') return // Banned 
        if (message.author.id == '681255843655581829') return // Hailey
        if (args.length < 0) return message.reply("say something dude").then(m => m.delete(6100));
        
        // Role color
        const roleColor = message.guild.me.highestRole.hexColor;

        // If the first argument is embed, send an embed,
        // otherwise, send a normal message
        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setColor('#fcffbf')
		.setTitle(`${message.author.username}'s embed!`)
		.setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL)
                .setAuthor(message.author.username, message.author.displayAvatarURL);
		
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
});

module.exports = {
    name: "love",
    aliases: ["affinity"],
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    usage: "[mention | id | username]",
    run: async (client, message, args) => {
        // Get a member from mention, id, or username
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const loveembed = new RichEmbed()
            .setColor('#ffb6c1')
            .addField(`☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(loveembed);
    }
}

client.login(process.env.TOKEN);