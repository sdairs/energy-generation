import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const generation_url = 'https://api.carbonintensity.org.uk/generation/';
const intensity_url = 'https://api.carbonintensity.org.uk/intensity/';


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const now = dayjs();
    const first = now.subtract(30, 'minute').format('YYYY-MM-DDTHH:mm[Z]');
    const second = now.subtract(60, 'minute').format('YYYY-MM-DDTHH:mm[Z]');

    await fetch(intensity_url + first)
        .then((response) => response.json())
        .then((data) => sendToTinybird(data['data']));
    await fetch(intensity_url + second)
        .then((response) => response.json())
        .then((data) => sendToTinybird(data['data']));
    await fetch(generation_url + first + '/' + now.format('YYYY-MM-DDTHH:mm[Z]'))
        .then((response) => response.json())
        .then((data) => sendToTinybird(data['data']));
    await fetch(generation_url + second + '/' + first)
        .then((response) => response.json())
        .then((data) => sendToTinybird(data['data']));
    // console.log(intensity_url + first);
    // console.log(intensity_url + second);
    // console.log(generation_url + first + '/' + now.format('YYYY-MM-DDTHH:mm[Z]'));
    // console.log(generation_url + second + '/' + first);
    // console.log(intensity_first);
    // console.log(intensity_second);
    // console.log(generation_first);
    // console.log(generation_second);

    res.status(200).end();
}


async function sendToTinybird(data: any) {
    console.log(data);
}

export default verifySignature(handler);


export const config = {
    api: {
        bodyParser: false,
    },
};