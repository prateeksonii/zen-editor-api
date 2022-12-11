import { Context } from "https://deno.land/x/oak@v11.1.0/context.ts";
import { ParseBody } from "../types/parseTypes.ts";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export const parseJavascript = async (ctx: Context) => {
  const body = ctx.request.body({ type: "json" });

  const { code } = (await body.value) as ParseBody;

  console.log(1);

  const tempPath = await Deno.makeTempDir();

  const file = await Deno.create(tempPath + "/temp.ts");

  await file.write(textEncoder.encode(code));
  file.close();

  console.log(`${tempPath}/temp.ts`);

  const resp = Deno.run({
    cmd: [`deno`, `run`, tempPath + "/temp.ts"],
    stdout: "piped",
  });

  const output = await resp.output();

  const outStr = textDecoder.decode(output).trim();

  ctx.response.body = {
    outStr,
  };
};
