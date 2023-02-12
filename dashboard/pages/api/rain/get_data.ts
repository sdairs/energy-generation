import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const base_url = "http://environment.data.gov.uk/flood-monitoring";
// const intensity_url = 'https://api.carbonintensity.org.uk/intensity/';

const station_ids = ["E21589", "E9350", "47106", "1332", "490001TP", "062916", "603111"]

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const since = dayjs().subtract(12, 'hour').format('YYYY-MM-DDTHH:mm:ss');
    station_ids.forEach(async (station_id) => {
        const uri = base_url + `/id/stations/${station_id}/readings?_sorted&since=${since}Z`;
        await fetch(base_url + uri)
            .then((response) => response.json())
            .then((data) => sendToTinybird(measureTransform(data['items'], station_id), 'rainfall_measures'));
    })
    res.status(200).end();
}

function measureTransform(data: any, station_id: string) {
    let transform: any[] = []
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

    fetch(
        `https://api.tinybird.co/v0/events?name=${datasource}`,
        {
            method: 'POST',
            body: data.map(JSON.stringify).join('\n'),
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