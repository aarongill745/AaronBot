declare global {
    namespace NodeJS {
        interface processEnv {
            Token: string;
        }
    }
}

export {};