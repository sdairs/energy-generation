import { NextApiRequest, NextApiResponse } from 'next';

const ranges: string[] = ['day', 'week', 'year', 'decade', 'latest'];

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { range } = request.query;
    if (range === undefined || Array.isArray(range)) {
        response.status(400).send({});
        return;
    } else {
        const r = range!.toString();
        if (ranges.includes(r)) {
            const data = await fetch(`https://api.tinybird.co/v0/pipes/generation_mix_api.json?token=${process.env.TINYBIRD_READ_TOKEN}&range=${r}`)
                .then((response) => response.json())
                .then((data) => data);
            response.status(200).json(data);
            return;
        }
        response.status(400).send({});
        return;
    }
}

