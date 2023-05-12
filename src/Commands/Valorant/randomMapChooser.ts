import { Command } from "../../Structures/Command";

export default new Command ({
    name: "map",
    description: "Chooses a random Valorant map",
    run: async ({ interaction }) => {
        const maps = ["Bind", "Breeze", "Fracture", "Ascent", "Haven", "Split", "Icebox"]
        const random = Math.floor(Math.random() * maps.length);
        interaction.followUp(`Alright everyone, get the fuck on ${maps[random]}`);
    },
})