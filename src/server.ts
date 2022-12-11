import "https://deno.land/std@0.167.0/dotenv/load.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import parseRouter from "./parse/parse.router.ts";

const app = new Application();
app.use(oakCors());

app.use(parseRouter.routes());

await app.listen({
  port: +(Deno.env.get("PORT") ?? 4000),
});
