import { mClient } from '$lib/_mqtt';

export async function POST({ params, request }) {
	await mClient.publish(
		'zigbee2mqtt/bridge/request/permit_join',
		JSON.stringify({ value: true, time: 300 })
	);

	console.log('Zigbee2Mqtt joining enabled');
	return new Response(undefined);
}
