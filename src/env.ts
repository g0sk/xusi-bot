import {createEnv} from "@t3-oss/env-core";
import {z} from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  clientPrefix: "DISCORD_",
  client: {
    DISCORD_TOKEN: z.string().min(1),
    DISCORD_PUBLIC_KEY: z.string().min(1),
    DISCORD_ID: z.string().min(1),
  },
  server: {},
  runtimeEnv: process.env,
});
