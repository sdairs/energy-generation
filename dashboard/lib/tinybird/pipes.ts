import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

export const generationMixRange = z.enum(["day", "week", "year", "decade", "latest"]);

const tb = new Tinybird({ token: process.env.TINYBIRD_READ_TOKEN! });

export const getGenerationMix = tb.buildPipe({
  pipe: "generation_mix_api",
  parameters: z.object({
    range: generationMixRange,
  }),
  data: z.object({
    time_from: z.string(),
    coal: z.number(),
    gas: z.number(),
    fossils: z.number(),
    hydro: z.number(),
    solar: z.number(),
    wind: z.number(),
    renewables: z.number(),
    other: z.number(),
    imports: z.number(),
    nuclear: z.number(),
    biomass: z.number(),
    other_sources: z.number(),
  }),
  opts: {
    revalidate: 1800
  }
});
