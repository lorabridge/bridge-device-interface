import { json as json$1 } from '@sveltejs/kit';
// import { createClient } from 'redis';
// import { config } from '$lib/_config';
import { client, PREFIX } from '$lib/_redis';

// const PREFIX = "lorabridge:attributes:";
// const client = createClient({ url: config.redis_conn_string });

// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();

export async function GET({ params }) {
    const { slug } = params;
    const value = await client.lRange(PREFIX + slug, 0, -1);

    if (value) {
        // throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
        // Suggestion (check for correctness before using):
        // return json$1(value);
        return json$1(value);
        // return {
        //     body: value
        // };
    }

    return new Response(undefined, { status: 404 });
}

export async function POST({ params, request }) {
    const { slug } = params;
    const data = await request.json();

    await client.lTrim(PREFIX + slug, -1, 0);
    console.log(data);
    await client.lPush(PREFIX + slug, data);

    return new Response(undefined);

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