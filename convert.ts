import satori from "npm:satori@0.10.13";
import { html } from "npm:satori-html@0.3.2";
import { ReactNode } from "npm:@types/react@18.2.38/index.d.ts";
import { Font } from "./types.ts";
import { Resvg, ResvgRenderOptions } from "npm:@resvg/resvg-js";

export async function markupToPng(markup: string, fonts: Font[]) {
  const react = html(markup);
  const width = 600;

  const svg = await satori(react as ReactNode, {
    width,
    fonts,
  });

  const resvgOpts: ResvgRenderOptions = {
    fitTo: {
      mode: "width", // If you need to change the size
      value: width,
    },
  };

  const resvg = new Resvg(svg, resvgOpts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}
