import { FontStyle, FontWeight } from "npm:satori@0.10.13/wasm";

export type Font = {
  name: string;
  data: Uint8Array;
  weight: FontWeight | undefined;
  style: FontStyle | undefined;
};
