// NextAuth v4 compatibility for Next.js 15 and React 19
declare module "next-auth" {
  export default function NextAuth(...args: any[]): any;
  export interface NextAuthOptions {
    providers?: any[];
    callbacks?: any;
    pages?: any;
    session?: any;
    jwt?: any;
    debug?: boolean;
    secret?: string;
    trustHost?: boolean;
    [key: string]: any;
  }
  export interface Account {
    [key: string]: any;
  }
  export interface Profile {
    [key: string]: any;
  }
  export interface Session {
    [key: string]: any;
  }
  export interface User {
    [key: string]: any;
  }
}

declare module "next-auth/jwt" {
  export function getToken(req: any): Promise<any>;
  export interface JWT {
    [key: string]: any;
  }
}