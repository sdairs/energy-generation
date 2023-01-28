import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const generation_url = 'https://api.carbonintensity.org.uk/generation/';
const intensity_url = 'https://api.carbonintensity.org.uk/intensity/';

// type intensityData = {
//     from: string,
//     to: string,
//     intensity: {
//         forecast: number,
//         actual: number,
//         index: string
//     }
// }
// {
//     "data": [{
//         "from": "2023-01-28T19:00Z",
//         "to": "2023-01-28T19:30Z",
//         "intensity": {
//             "forecast": 256,
//             "actual": 262,
//             "index": "high"
//         }
//     }]
// }

// type generationData = {
//     from: string,
//     to: string,
//     intensity: {
//         forecast: number,
//         actual: number,
//         index: string
//     }
// }
// {
//     "data": [
//         {
//             "from": "2023-01-28T18:30Z",
//             "to": "2023-01-28T19:00Z",
//             "generationmix": [
//                 {
//                     "fuel": "biomass",
//                     "perc": 5.3
//                 },
//                 {
//                     "fuel": "coal",
//                     "perc": 2.5
//                 },
//                 {
//                     "fuel": "imports",
//                     "perc": 13.4
//                 },
//                 {
//                     "fuel": "gas",
//                     "perc": 53.3
//                 },
//                 {
//                     "fuel": "nuclear",
//                     "perc": 12.3
//                 },
//                 {
//                     "fuel": "other",
//                     "perc": 0
//                 },
//                 {
//                     "fuel": "hydro",
//                     "perc": 4.3
//                 },
//                 {
//                     "fuel": "solar",
//                     "perc": 0
//                 },
//                 {
//                     "fuel": "wind",
//                     "perc": 8.8
//                 }
//             ]
//         }
//     ]
// }

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const now = dayjs();
    const first = now.subtract(30, 'minute').format('YYYY-MM-DDTHH:mm[Z]');
    const second = now.subtract(60, 'minute').format('YYYY-MM-DDTHH:mm[Z]');

    await fetch(intensity_url + first)
        .then((response) => response.json())
        .then((data) => sendToTinybird(intensityTransform(data['data'][0]), 'intensity'));
    await fetch(intensity_url + second)
        .then((response) => response.json())
        .then((data) => sendToTinybird(intensityTransform(data['data'][0]), 'intensity'));
    await fetch(generation_url + first + '/' + now.format('YYYY-MM-DDTHH:mm[Z]'))
        .then((response) => response.json())
        .then((data) => sendToTinybird(generationTransform(data['data'][0]), 'generation'));
    await fetch(generation_url + second + '/' + first)
        .then((response) => response.json())
        .then((data) => sendToTinybird(generationTransform(data['data'][0]), 'generation'));

    res.status(200).end();
}

function intensityTransform(data: any) {
    return {
        time_from: data.from,
        time_to: data.to,
        intensity_actual: data.intensity.actual ?? 0,
        intensity_forecast: data.intensity.forecast ?? 0,
        intensity_index: data.intensity.index ?? 'unknown',
    };
}

function generationTransform(data: any) {
    let transform: any = {
        time_from: data.from,
        time_to: data.to,
    }
    data.generationmix.forEach((item: any) => {
        transform[item.fuel] = item.perc ?? 0;
    })
    return transform;
}


async function sendToTinybird(data: any, datasource: string) {
    fetch(
        `https://api.tinybird.co/v0/events?name=${datasource}`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}` }
        }
    );
}

export default verifySignature(handler);


export const config = {
    api: {
        bodyParser: false,
    },
};