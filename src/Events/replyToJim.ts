import { Event } from "../Structures/Event";
import { Message } from "discord.js";

export default new Event('messageCreate', async (message: Message) => {
    // Jim Kwons id
    const userId = "186402825323020289"
    const phrases = ["Bro, no one gives a fuck", "Just shut the fuck up", "No one fucking asked", "Why do you feel the need to talk?"]
    const random = Math.floor(Math.random() * phrases.length)
    if (message.author.id === userId) {
        message.reply(phrases[random]);
    }
})