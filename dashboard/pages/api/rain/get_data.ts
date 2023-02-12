import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const base_url = "http://environment.data.gov.uk/flood-monitoring";

const station_ids = ["E21589", "E9350", "47106", "1332", "490001TP", "062916", "603111"]

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const since = dayjs().subtract(12, 'hour').format('YYYY-MM-DDTHH:mm:ss');
    for (const i in station_ids) {
        const url = base_url + `/id/stations/${station_ids[i]}/readings?_sorted&since=${since}Z`;
        console.log(url)
        await fetch(url)
            .then((response) => response.json())
            .then((data) => sendToTinybird(measureTransform(data['items'], station_ids[i]), 'rainfall_measures'));
    }
    res.status(200).end();
}

function measureTransform(data: any, station_id: string) {
    let transform: any[] = [];
    data.forEach((item: any) => {
        transform.push({
            "station_id": station_id,
            "time_from": item.dateTime,
            "measure": item.value
        });
    })
    return transform;
}

async function sendToTinybird(data: any, datasource: string) {
    console.log("sendToTinybird")
    console.log(data.map(JSON.stringify).join('\n'))
    await fetch(
        `https://api.tinybird.co/v0/events?name=${datasource}`,
        {
            method: 'POST',
            body: data.map(JSON.stringify).join('\n'),
            headers: { Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}` }
        }
    ).then((response) => console.log(response.status));
}

export default verifySignature(handler);


export const config = {
    api: {
        bodyParser: false,
    },
};