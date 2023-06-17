import { NextApiRequest, NextApiResponse } from "next";
import { getGenerationMix } from "../../../lib/tinybird";
import { generationMixRange } from "../../../lib/tinybird";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const range = generationMixRange.parse(request.query.range);
  if (range === undefined) {
    response.status(400).send({});
    return;
  } else {
    const data = await getGenerationMix({ range: range });
    response.status(200).json(data);
    return;
  }
}
