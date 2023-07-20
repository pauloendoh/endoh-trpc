import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../../../../trpcServer/routers/appRouter";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type WastedOutput = RouterOutput["wasted"]["myWasteds"][0];
