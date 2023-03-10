import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const ranges: string[] = ['day', 'week', 'year', 'decade', 'latest'];

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const { range } = request.query;
    if (range === undefined || Array.isArray(range)) {
        response.status(400).send({});
    } else {
        const r = range!.toString();
        if (ranges.includes(r)) {
            const data = await fetch(`https://api.tinybird.co/v0/pipes/generation_mix_api.json?token=p.eyJ1IjogIjc4ZmVhOGY5LTkzNzYtNDQzMC1iNTUwLTA0YTU5MWM2ZTFjZSIsICJpZCI6ICJiYWFhZWNiYy1kMjk0LTQyM2QtOTc0Ny1lZjBiNDQyMDFmYTMifQ.wkD8QpT_oXE5UqEB92a9APCZOhBx_mN92PpWu3lkMQI&range=${r}`)
                .then((response) => response.json())
                .then((data) => data);
            response.status(200).send(data);
        }
        response.status(400).send({});
    }
}

