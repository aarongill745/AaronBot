import { Message } from "discord.js"
import { Event } from "../Structures/Event"

export default new Event('messageCreate', async (message: Message) => {
    const userId = "194362849143816192"
    if (message.author.id == userId) {
        message.reply("Are you still chatting up that minor?")
    }
})