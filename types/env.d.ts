import { env } from "node:process"
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DEV_API: string
      NEXT_PUBLIC_PROD_API: string
    }
  }
}
