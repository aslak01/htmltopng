import { markupToPng } from "./convert.ts";
import { Font } from "./types.ts";
import { toText } from "https://deno.land/std@0.224.0/streams/mod.ts";
import { assert } from "jsr:@std/assert@1";

export function add(a: number, b: number): number {
  return a + b;
}

main();

async function main() {
  const url = Deno.args[0];

  const fetchObj = await fetch(url);
  const htmlstr = await toText(fetchObj.body);
  console.log(htmlstr);

  const roboto = Deno.readFileSync("./Roboto-Regular.ttf");
  const fonts: Font[] = [
    {
      name: "Roboto",
      data: roboto,
      weight: 400,
      style: "normal",
    },
  ];
  const opts = {
    fonts,
    width: 600,
    height: 300,
  };
  const png = await markupToPng(htmlstr, opts);

  Deno.writeFileSync("./testfile.png", png);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
