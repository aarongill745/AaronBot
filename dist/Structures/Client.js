"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    constructor() {
        super({ intents: 32767 });
    }
    start() {
        this.registerModules();
        this.login(process.env.Token);
    }
    async importFile(filePath) {
        return (await Promise.resolve(`${filePath}`).then(s => tslib_1.__importStar(require(s))))?.default;
    }
    async registerModules() {
        const slashCommands = [];
        const commandFiles = await globPromise(`${__dirname}/../Commands/*/*{.ts,.js}`);
        console.log({ commandFiles });
        commandFiles.forEach(async (filePath) => {
            const command = await this.importFile(filePath);
            if (!command.name)
                return;
            console.log(command);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });
        const eventFiles = await globPromise(`${__dirname}/../Events/*{.ts,.js}`);
        console.log(eventFiles);
        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }
    async registerCommands({ commands }) {
        this.application?.commands.set(commands);
        console.log('Registering global commands');
    }
}
exports.ExtendedClient = ExtendedClient;
