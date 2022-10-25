const STATIC_ATTRIBUTES = ['linkquality'];

import { config } from '$lib/_config';
/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
export async function load({ url, fetch, data }) {
	// get devices already on server for server side rendering

	const res = await fetch((config.sse_addr || 'http://' + url.hostname + ':' + config.sse_port) + '/devices', { headers: { origin: url.origin } });
	const dev_data = await res.json();
	const attributes: { [key: string]: any } = {};
	for (const ieeeAddr in dev_data) {
		dev_data[ieeeAddr]['attributes'] = [...dev_data[ieeeAddr]['attributes'], ...STATIC_ATTRIBUTES];
		const res_atts = await fetch('/device_attributes/' + ieeeAddr);
		const atts = await res_atts.json();
		if (atts.length > 0) {
			attributes[ieeeAddr] = atts;
		}
	}
	const state_res = await fetch((config.sse_addr || 'http://' + url.hostname + ':' + config.sse_port) + '/stats', { headers: { origin: url.origin } });
	data = { ...data, ... await state_res.json() };
	// console.log(data);
	// try {
	// 	const res = await fetch('stats/lorawan');
	// 	if (!res.ok) {
	// 		throw new Error("Fetch returned not ok");
	// 	}
	// 	data['lorawan'] = await res.json();
	// 	console.log((await fetch('stats/lorawan')).ok);
	// } catch (error) {
	// 	data['lorawan'] = { txstatus: "unknown", queueLength: "unknown" };
	// 	console.log("unable to get lorawan info");
	// 	console.error(error);
	// }
	// try {
	// 	const res = await fetch('stats/zigbee');
	// 	if (!res.ok) {
	// 		throw new Error("Fetch returned not ok");
	// 	}
	// 	data['zigbee'] = await res.json();
	// }
	// catch (error) {
	// 	data['zigbee'] = { status: "unknown", devices: "unknown" };
	// 	console.log("unable to get zigbee info");
	// 	console.error(error);
	// }

	return {
		device_data: dev_data,
		device_attributes: attributes,
		stats: data,
	};
}
