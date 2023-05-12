import { Command } from "../../Structures/Command";

export default new Command ({
    name: "roll",
    description: "returns number between 0 and 100 (inclusive)",
    run: async ({interaction}) => {
        const randomNum = Math.floor(Math.random() * 100);
        interaction.followUp(`${randomNum}`)
    }
})