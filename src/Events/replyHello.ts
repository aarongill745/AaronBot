import { Event } from "../Structures/Event";
import { Message } from "discord.js";

export default new Event('messageCreate', async (message: Message) => {
    console.log(message); 
    if (message.content == 'hello') {
        message.reply('Hello')
    }
})