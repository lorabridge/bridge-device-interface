import { json as json$1 } from '@sveltejs/kit';
// import { createClient } from 'redis';
// import { config } from '$lib/_config';
import { state, devCount, mClient } from '$lib/_mqtt';
// const PREFIX = "lorabridge:attributes:";
// const client = createClient({ url: config.redis_conn_string });

// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();

export async function POST({ params, request }) {
    await mClient.publish("zigbee2mqtt/request/permit_join", JSON.stringify({ "value": true, "time": 300 }));

    console.log("join req");
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