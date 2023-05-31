import { Event } from "../Structures/Event";
import { Message } from "discord.js";

export default new Event('messageCreate', async (message: Message) => {
    // Jim Kwons id
    const userId = "186402825323020289"
    const phrases = ["You're so right!"]
    const random = Math.floor(Math.random() * phrases.length)
    if (message.author.id === userId) {
        message.reply(phrases[random]);
    }
})