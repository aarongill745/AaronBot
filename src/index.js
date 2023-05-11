require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.username} is gonna do the thing.`)
})

client.on('messageCreate', (message) => {
    console.log(message.content)
    if (message.author.bot) {
        return;
    }
    console.log(message.author.id);
    if (message.author.id === '138806957891911680') {
        
        message.reply('WARNING, this user is a known criminal')
    }

    if (message.content  === 'hello') {
        message.reply('Sup bitch')
    }
})

client.login(process.env.TOKEN);