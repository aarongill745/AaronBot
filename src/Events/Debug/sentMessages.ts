import { Event } from "../../Structures/Event"
import { Message } from "discord.js"
export default new Event('messageCreate', async(message: Message) => {
    console.log(`Message from ${message.author.username}: ${message.content}`)
})