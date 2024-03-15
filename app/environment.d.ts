declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string;
      PREVIOUS_SESSION_SECRET: string | undefined;
    }
  }
}

export {};
