<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		// let parts = url.pathname.split('/').filter((n) => n);

		const res = await fetch('http://127.0.0.1:8080/devices');
		const data = await res.json();
		// console.log(data);
		// const devices=[];
		// for (let i=0;i<data.length;i++){
		// 	data[i]['editFunc'] = triggerEdit
		// 	data[i]['saveFunc']
		// 	data[i]['cancelFunc']
		// 	devices.push({device:data[i],});
		// }

		return {
			props: {
				device_data: data
			}
		};
	}
</script>

<script lang="ts">
	import { Card, Table, TableDefaultRow, Button } from 'flowbite-svelte';
	import { SvelteComponent } from 'svelte';
	import { Adjustments } from 'svelte-heros';
	import { SvelteElement } from 'svelte/internal';
	import DeviceCard from './_DeviceCard.svelte';
	import EditCard from './_EditCard.svelte';
	import { streamable } from 'svelte-streamable';

	import { onMount } from 'svelte';

	export let device_data;
	// $: test = device_data;
	let devices = [];
	// console.log(device_data);
	$: {
		// console.log(device_data);
		let tmp = [];
		for (const ieeeAddr in device_data) {
			// console.log(device_data[ieeeAddr]['attributes']);
			tmp.push({
				device: {
					...device_data[ieeeAddr],
					attributes: device_data[ieeeAddr]['attributes'].reduce((accumulator, value) => {
						return { ...accumulator, [value]: true };
					}, {}),
					editFunc: triggerEdit,
					saveFunc: saveEdit,
					cancelFunc: cancelEdit
				},
				component: DeviceCard as unknown as DeviceCard | EditCard,
				old: {} as { [key: string]: boolean }
			});
		}
		// console.log(a);
		devices = tmp;
	}

	onMount(async () => {
		let sseDevices;

		streamable({
			url: 'http://127.0.0.1:8080/sse',
			event: 'init'
		}).subscribe(async (value) => {
			sseDevices = await value;
			// console.log(sseDevices);
		});

		const updatesAsync = streamable({
			url: 'http://127.0.0.1:8080/sse',
			event: 'message'
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
		for (var i = 0; i < devices.length; i++) {
			// for (const dev of devices){
			if (devices[i]['device']['ieeeAddr'] === ieeeAddr) {
				devices[i]['component'] = EditCard as unknown as DeviceCard | EditCard;
				// console.log(ieeeAddr);
				// console.log(devices[i]['component']);
				devices[i]['old'] = { ...devices[i]['device']['attributes'] };
				// console.log(dev['component'])
				// new EditCard({})
				break;
			}
		}
	}

	function cancelEdit(ieeeAddr: string) {
		for (var i = 0; i < devices.length; i++) {
			if (devices[i]['device']['ieeeAddr'] === ieeeAddr) {
				devices[i]['device']['attributes'] = devices[i]['old'];
				devices[i]['component'] = DeviceCard as unknown as DeviceCard | EditCard;
				break;
			}
		}
	}

	function saveEdit(ieeeAddr: string) {
		for (var i = 0; i < devices.length; i++) {
			if (devices[i]['device']['ieeeAddr'] === ieeeAddr) {
				// devices[i]['device']['attributes'] = devices[i]['old'];
				devices[i]['component'] = DeviceCard as unknown as DeviceCard | EditCard;
				break;
			}
		}
	}
</script>

<div class="grid grid-cols-4 place-items-center gap-8">
	{#each devices as elem}
		<svelte:component this={elem['component']} device={elem['device']} />
	{/each}
</div>
