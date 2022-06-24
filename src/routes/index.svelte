<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		// get devices already on server for server side rendering
		const res = await fetch('http://127.0.0.1:8080/devices');
		const data = await res.json();
		const attributes: { [key: string]: any } = {};
		for (const ieeeAddr in data) {
			const res_atts = await fetch('/device_attributes/' + ieeeAddr);
			const atts = await res_atts.json();
			if (atts.length > 0) {
				attributes[ieeeAddr] = atts;
			}
		}

		return {
			props: {
				device_data: data,
				device_attributes: attributes
			}
		};
	}
</script>

<script lang="ts">
	import { Card, Table, TableDefaultRow, Button, InteractiveTabHead } from 'flowbite-svelte';
	import { SvelteComponent } from 'svelte';
	import { Adjustments } from 'svelte-heros';
	import { SvelteElement } from 'svelte/internal';
	import DeviceCard from './_DeviceCard.svelte';
	import EditCard from './_EditCard.svelte';
	import { streamable } from 'svelte-streamable';

	import { onMount } from 'svelte';

	export let device_data;
	export let device_attributes;
	$: console.log(device_attributes);

	let devices: { [key: string]: { [key: string]: any } } = {};
	// console.log(device_data);
	$: {
		// console.log(device_data);
		let tmp: { [key: string]: {} } = {};
		for (const ieeeAddr in device_data) {
			// console.log(device_data[ieeeAddr]['attributes']);
			tmp[ieeeAddr] = prepareDevice(device_data[ieeeAddr]);
		}
		devices = tmp;
	}
	function prepareDevice(dev: { [key: string]: any }) {
		return {
			device: {
				...dev,
				attributes: dev['attributes'].reduce((accumulator, value) => {
					return {
						...accumulator,
						[value]:
							dev['ieeeAddr'] in device_attributes &&
							device_attributes[dev['ieeeAddr']].indexOf(value) >= 0
								? false
								: true
					};
				}, {}),
				editFunc: triggerEdit,
				saveFunc: saveEdit,
				cancelFunc: cancelEdit
			},
			component: DeviceCard as unknown as DeviceCard | EditCard,
			old: {} as { [key: string]: boolean }
		};
	}

	function updateDevice(ieeeAddr, newDevice) {
		devices[ieeeAddr]['device'] = {
			...devices[ieeeAddr]['device'],
			...newDevice,
			attributes: newDevice['attributes'].reduce((accumulator, value) => {
				return {
					...accumulator,
					[value]:
						value in devices[ieeeAddr]['device']['attributes']
							? devices[ieeeAddr]['device']['attributes'][value]
							: ieeeAddr in device_attributes && device_attributes[ieeeAddr].indexOf(value) >= 0
							? false
							: true
				};
			}, {})
		};
	}

	onMount(async () => {
		// get devices initially per sse, in case they changed after the server side rendering
		streamable({
			url: 'http://127.0.0.1:8080/sse',
			event: 'init'
		}).subscribe(async (value) => {
			let sseDevices: { [key: string]: any } = (await value) as {};
			for (const ieeeAddr in sseDevices) {
				if (ieeeAddr in devices) {
					updateDevice(ieeeAddr, sseDevices[ieeeAddr]);
				} else {
					devices[ieeeAddr] = prepareDevice(sseDevices[ieeeAddr]);
				}
			}
			// console.log(sseDevices);
		});

		//get changed or new devices per sse
		const updatesAsync = streamable({
			url: 'http://127.0.0.1:8080/sse',
			event: 'message'
		}).subscribe(async (value) => {
			console.log('updates');
			let sseDevice: { [key: string]: any } = (await value) as {};
			if (sseDevice['ieeeAddr'] in devices) {
				updateDevice(sseDevice['ieeeAddr'], sseDevice);
			} else {
				devices[sseDevice['ieeeAddr']] = prepareDevice(sseDevice);
			}
		});
	});

	// let devices = [
	// 	{
	// 		device: {
	// 			devName: 'lumi.weather1',
	// 			ieeeAddr: '0x00158d0002310451',
	// 			manufName: 'LUMI',
	// 			attributes: {
	// 				temperature: true,
	// 				humidity: false,
	// 				pressure: true,
	// 				voltage: true,
	// 				battery: true
	// 			} as { [key: string]: boolean },
	// 			editFunc: triggerEdit,
	// 			cancelFunc: cancelEdit,
	// 			saveFunc: saveEdit
	// 		},
	// 		component: DeviceCard as unknown as DeviceCard | EditCard,
	// 		old: {} as { [key: string]: boolean }
	// 	},
	// 	{
	// 		device: {
	// 			devName: 'lumi.weather2',
	// 			ieeeAddr: '0x00158d0002310452',
	// 			manufName: 'LUMI',
	// 			attributes: {
	// 				temperature: true,
	// 				humidity: false,
	// 				pressure: true,
	// 				voltage: true,
	// 				battery: true
	// 			} as { [key: string]: boolean },
	// 			editFunc: triggerEdit,
	// 			cancelFunc: cancelEdit,
	// 			saveFunc: saveEdit
	// 		},
	// 		component: DeviceCard as unknown as DeviceCard | EditCard,
	// 		old: {} as { [key: string]: boolean }
	// 	}
	// ];

	function triggerEdit(ieeeAddr: string) {
		devices[ieeeAddr]['component'] = EditCard as unknown as DeviceCard | EditCard;
		devices[ieeeAddr]['old'] = { ...devices[ieeeAddr]['device']['attributes'] };
	}

	function cancelEdit(ieeeAddr: string) {
		devices[ieeeAddr]['device']['attributes'] = devices[ieeeAddr]['old'];
		devices[ieeeAddr]['component'] = DeviceCard as unknown as DeviceCard | EditCard;
	}

	function saveEdit(ieeeAddr: string) {
		devices[ieeeAddr]['component'] = DeviceCard as unknown as DeviceCard | EditCard;

		const res = fetch('device_attributes/' + ieeeAddr, {
			method: 'POST',
			body: JSON.stringify(
				Object.entries(devices[ieeeAddr]['device']['attributes'])
					.filter((x) => !x[1])
					.reduce((prev, cur) => [...prev, cur[0]], [] as string[])
			)
		});
	}
</script>

<div class="grid grid-cols-4 place-items-center gap-8">
	{#each Object.entries(devices) as elem}
		<svelte:component this={elem[1]['component']} device={elem[1]['device']} />
	{/each}
</div>
