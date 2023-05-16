import { building } from '$app/environment';
import { default as mqtt } from 'async-mqtt';
import { config } from '$lib/_config';

let mClient;

if (!building) {
	mClient = await mqtt.connectAsync('mqtt://' + config.mqtt_host + ':' + config.mqtt_port);
} else {
	mClient = null;
}

export { mClient };
