import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

const generation_url = 'https://api.carbonintensity.org.uk/generation/';
const intensity_url = 'https://api.carbonintensity.org.uk/intensity/';


async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log("If this is printed, the signature has already been verified");
    const now = dayjs();
    const first = now.subtract(30, 'minute').format('YYYY-MM-DDTHH:mm[Z]');
    const second = now.subtract(60, 'minute').format('YYYY-MM-DDTHH:mm[Z]');

    console.log(generation_url + first);
    console.log(await fetch(generation_url + first));

    res.status(200).end();
}


export default verifySignature(handler);


export const config = {
    api: {
        bodyParser: false,
    },
};