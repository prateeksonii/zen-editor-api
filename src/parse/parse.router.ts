import { Router } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { parseJavascript } from "./parse.controller.ts";

const router = new Router();

router.prefix("/parse");

router.post("/", parseJavascript);

export default router;
