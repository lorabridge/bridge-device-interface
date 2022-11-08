import { mClient } from '$lib/_mqtt';

export async function POST({ params, request }) {
    const id = (await request.json()).id;
    console.log(id);
    await mClient.publish("zigbee2mqtt/bridge/request/device/remove", JSON.stringify({ "id": id }));
    await mClient.publish("zigbee2mqtt/bridge/request/device/remove", JSON.stringify({ "id": id, "force": true }));

    console.log("Zigbee device removed");
    return new Response(undefined);
}