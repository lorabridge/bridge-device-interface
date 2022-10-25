<script lang="ts">
	import { Card, Table, Button } from 'flowbite-svelte';
	import { Adjustments } from 'svelte-heros';
	import { attr } from 'svelte/internal';
	export let device: {
		devName: string;
		ieeeAddr: string;
		manufName: string;
		attributes: { [key: string]: boolean };
		cancelFunc?: Function;
		saveFunc?: Function;
		editFunc: Function;
	};
	$: ({ devName, ieeeAddr, manufName, attributes, cancelFunc, saveFunc, editFunc } = device);
	// export let devName: string;
	// export let ieeeAddr: string;
	// export let manufName: string;
	// export let attributes: { [key: string]: boolean };
	// export let editFunc = (ieeeAddr: string) => {};
</script>

<Card>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{devName}
	</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400">
		<Table header={[]} divClass="relative overflow-x-auto sm:rounded-lg border-2 border-dashed">
			<!-- <TableDefaultRow items={itemEx} html /> -->
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">ieeeAddr</th>
				<td class="pr-4">{ieeeAddr}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">manufName</th>
				<td class="pr-4">{manufName}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-100 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">Attributes</th>
				<td class="pr-4">
					<ul class="text-sm font-medium">
						{#each Object.entries(attributes) as [attribute, enabled]}
							<li class="py-1 {!enabled ? 'text-gray-300' : ''}">{attribute}</li>
						{/each}
					</ul></td
				>
			</tr>
		</Table>
		<span class="float-right space-x-2 mt-2">
			<Button
				name="Button"
				color="light"
				textSize="text-xs"
				on:click={() => {
					editFunc(ieeeAddr);
				}}
			>
				<Adjustments class="text-blue-700 dark:text-red-700" />
			</Button>
		</span>
	</p>
</Card>
