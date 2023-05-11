import { Client, Collection, ApplicationCommandDataResolvable, ClientEvents } from "discord.js"
import { CommandType } from "../Typings/Command";
import glob from "glob"
import { promisify } from "util";
import { RegisterCommandsOptions } from "../Typings/client";
import { Event } from "./Event";

const globPromise = promisify(glob)

export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();

    constructor() {
        super({ intents: 32767 });
    }

    start() {
        this.registerModules()
        this.login(process.env.Token);
    }

    async importFile(filePath: string) {
        return (await import(filePath))?.default
    }

    async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = []
        const commandFiles =  await globPromise(`${__dirname}/../Commands/*/*{.ts,.js}`)
        console.log({ commandFiles })

        commandFiles.forEach(async filePath => {
            const command: CommandType = await this.importFile(filePath)
            if(!command.name) return
            console.log(command)
            this.commands.set(command.name, command);
            slashCommands.push(command)
        })

        this.on('ready', () => {
            this.registerCommands({
                commands: slashCommands,
            })
        })

        const eventFiles =  await globPromise(`${__dirname}/../Events/*{.ts,.js}`)
        console.log(eventFiles)
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath)
            this.on(event.event, event.run)
        })

    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands)
        } else {
            this.application?.commands.set(commands)
            console.log('Registering global commands', commands)
        }
    }
}