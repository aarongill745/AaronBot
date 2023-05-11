import { ExtendedClient } from "../Structures/Client";
import { CommandInteraction, CommandInteractionOptionResolver, ChatInputApplicationCommandData, PermissionResolvable, GuildMember } from "discord.js"

interface RunOptions {
    client: ExtendedClient
    interaction: ExtendedInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}
