import { markupToPng } from "./convert.ts";
import { Font } from "./types.ts";

export function add(a: number, b: number): number {
  return a + b;
}

main();

async function main() {
  const roboto = Deno.readFileSync("./Roboto-Regular.ttf");
  const fonts: Font[] = [
    {
      name: "Roboto",
      data: roboto,
      weight: 400,
      style: "normal",
    },
  ];
  const markup = "<h1>hei</h1>";
  const png = await markupToPng(markup, fonts);

  Deno.writeFileSync("./testfile.png", png);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
