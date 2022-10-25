import { default as mqtt } from "async-mqtt";
import { config } from '$lib/_config';

const mClient = await mqtt.connectAsync("mqtt://" + config.mqtt_host + ":" + config.mqtt_port);

export { mClient };
