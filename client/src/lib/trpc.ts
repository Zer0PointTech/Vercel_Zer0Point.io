import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/routers-vercel";

export const trpc = createTRPCReact<AppRouter>();
