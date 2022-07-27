import { createClient } from 'redis';
import { config } from '$lib/_config';

const PREFIX = "lorabridge:attributes:";
const client = createClient({ url: config.redis_conn_string });

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export async function GET({ params }) {
    const { slug } = params;
    const value = await client.lRange(PREFIX + slug, 0, -1);

    if (value) {
        return {
            body: value
        };
    }

    return {
        status: 404
    };
}

export async function POST({ params, request }) {
    const { slug } = params;
    const data = await request.json();

    await client.lTrim(PREFIX + slug, -1, 0);
    console.log(data);
    await client.lPush(PREFIX + slug, data);

    return { status: 200 };

    // if (errors) {
    //     // return validation errors
    //     return {
    //         status: 400,
    //         body: { errors }
    //     };
    // }

    // // redirect to the newly created item
    // return {
    //     status: 303,
    //     headers: {
    //         location: `/items/${item.id}`
    //     }
    // };
}