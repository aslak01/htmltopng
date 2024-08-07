import satori from "npm:satori@0.10.13";
import { html } from "npm:satori-html@0.3.2";
import { ReactNode } from "npm:@types/react@18.2.38/index.d.ts";
import { Resvg, ResvgRenderOptions } from "npm:@resvg/resvg-js";
import { classToInline } from "npm:html-style-converter@1.4.3";
import { Font } from "./types.ts";

type PngConvOptions = {
  width: number;
  height: number;
  fonts: Font[];
};

export async function markupToPng(
  markup: string,
  { width, height, fonts }: PngConvOptions,
) {
  const inlined = classToInline(markup);
  const react: ReactNode = html(inlined);
  const svg = await satori(react, {
    width,
    height,
    fonts,
  });

  const resvgOpts: ResvgRenderOptions = {
    fitTo: {
      mode: "width",
      value: width,
    },
  };

  const resvg = new Resvg(svg, resvgOpts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}
