declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_W3C_PID: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_AAI_REDIRECT: string;
    }
  }
}

export {};
