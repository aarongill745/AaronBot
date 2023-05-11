declare global {
    namespace NodeJS {
        interface processEnv {
            Token: string;
            guildId: string;
        }
    }
}

export {};