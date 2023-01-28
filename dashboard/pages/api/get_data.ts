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

    const intensity_first = await fetch(intensity_url + first);
    const intensity_second = await fetch(intensity_url + second);
    const generation_first = await fetch(generation_url + first + '/' + now.format('YYYY-MM-DDTHH:mm[Z]'));
    const generation_second = await fetch(generation_url + second + '/' + first);
    console.log(intensity_url + first);
    console.log(intensity_url + second);
    console.log(generation_url + first + '/' + now.format('YYYY-MM-DDTHH:mm[Z]'));
    console.log(generation_url + second + '/' + first);
    console.log(intensity_first);
    console.log(intensity_second);
    console.log(generation_first);
    console.log(generation_second);

    res.status(200).end();
}


export default verifySignature(handler);


export const config = {
    api: {
        bodyParser: false,
    },
};