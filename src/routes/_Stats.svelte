<script lang="ts">
	export let stats: { [key: string]: any };
	import { Button, Card, Table } from 'flowbite-svelte';
	console.log(stats);
	const Z_INIT = 254;
	let lock = false;
	let zcount = 0;

	function zjoin() {
		if (lock === false) {
			lock = true;
			zcount = Z_INIT;
			fetch('stats/zigbee/join', { method: 'POST' });
			setTimeout(handleCounter, 1000);
		}
	}
	function handleCounter() {
		zcount--;
		if (zcount > 0) {
			setTimeout(handleCounter, 1000);
		} else {
			lock = false;
		}
	}
</script>

<Card>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Stats</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400">
		<Table header={[]} divClass="relative overflow-x-auto sm:rounded-lg border-2 border-dashed">
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Device EUI:</th>
				<td class="pr-6 text-right">{stats.deveui}</td>
			</tr>
			{#each Object.entries(stats.interfaces) as elem}
				<tr class="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
					<th scope="col" class="px-6 py-3">{elem[0]}:</th>
					<td class="pr-6 text-right">{elem[1]}</td>
				</tr>
			{/each}
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">CPU usage:</th>
				<td class="pr-6 text-right">{stats.cpu.toFixed(2)} %</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Avail memory:</th>
				<td class="pr-6 text-right">{stats.mem.toFixed(2)} %</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Free disk space:</th>
				<td class="pr-6 text-right">{stats.disk.toFixed(2)} %</td>
			</tr>
			{#if stats.temp}
				<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
					<th scope="col" class="px-6 py-3">Temperature:</th>
					<td class="pr-6 text-right">{stats.temp.toFixed(2)} °C</td>
				</tr>
			{/if}
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Last Boot:</th>
				<td class="pr-6 text-right">{new Date(stats.uptime).toUTCString()}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Zigbee2mqtt:</th>
				<td class="pr-6 text-right">{stats.zigbee.status}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Zigbee devices:</th>
				<td class="pr-6 text-right">{stats.zigbee.devices}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">LoRaWAN TX:</th>
				<td class="pr-6 text-right">{stats.lorawan.txstatus}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">TX queue length:</th>
				<td class="pr-6 text-right">{stats.lorawan.queueLength}</td>
			</tr>
		</Table>
	</p>
</Card>

<div class="mt-8">
	<Button color="blue" pill outline on:click={zjoin}>Enable Zigbee join</Button>
	<span
		class="ml-5 mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white inline-block"
		style="visibility: {zcount > 0 ? 'visible' : 'hidden'}">Join timeout: {zcount} sec</span
	>
</div>
