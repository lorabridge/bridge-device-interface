import * as mqtt from "async-mqtt";
import { config } from '$lib/_config';

const STATETOPIC = 'zigbee2mqtt/bridge/state';
const DEVICESTOPIC = 'zigbee2mqtt/bridge/devices';

const mClient = await mqtt.connectAsync([{ host: config.mqtt_host, port: config.mqtt_port }])
let state = "unknown";
let devCount = 0;

await mClient.subscribe([STATETOPIC, DEVICESTOPIC]);
// function getMessage(millis: number): Promise<any> {
//     const promise = new Promise(resolve => {
//         mClient.on("message", (topic, message, packet) => {
//             if (topic === STATETOPIC) {
//                 resolve(JSON.parse(message.toString())["state"]);
//             }
//         })
//     });
//     const timeout = new Promise((resolve, reject) =>
//         setTimeout(
//             () => reject(`Timed out after ${millis} ms.`),
//             millis));
//     return Promise.race([
//         promise,
//         timeout
//     ]);
// }

mClient.on("message", (topic, message, packet) => {
    if (topic === STATETOPIC) {
        state = JSON.parse(message.toString())["state"];
    } else if (topic === DEVICESTOPIC) {
        let i = 0;
        for (const dev of JSON.parse(message.toString())) {
            if (dev['type'] !== 'Coordinator') {
                i++;
            }
        }
        devCount = i;
    }
});

export { state, devCount, mClient};
