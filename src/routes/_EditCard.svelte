<script lang="ts">
	import { Card, Table, Button, Toggle, ButtonGroup } from 'flowbite-svelte';
	import { Check, XMark } from 'svelte-heros';
	export let device: {
		devName: string;
		ieeeAddr: string;
		manufName: string;
		attributes: { [key: string]: boolean };
		cancelFunc: Function;
		saveFunc: Function;
		editFunc?: Function;
	};
	$: ({ devName, ieeeAddr, manufName, attributes, cancelFunc, saveFunc, editFunc } = device);

	let defaultClasses =
		'inline-flex items-center py-0.5 px-1 text-xs font-medium first:rounded-l-lg border-t border-b last:rounded-r-md border-l last:border-r focus:z-10 focus:ring-2';
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
							<li class="py-1">
								<Toggle
									size="small"
									value="{ieeeAddr}-{attribute}-toggle"
									name="{ieeeAddr}-{attribute}-toggle"
									id="{ieeeAddr}-{attribute}-toggle"
									bind:checked={device['attributes'][attribute]}>{attribute}</Toggle
								>
							</li>
						{/each}
					</ul></td
				>
			</tr>
		</Table>
		<span class="float-right space-x-2 mt-2">
			<ButtonGroup>
				<Button
					on:click={() => {
						saveFunc(ieeeAddr);
					}}
					btnClass="{defaultClasses} text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 "
					><Check size="30" /></Button
				>
				<Button
					on:click={() => {
						cancelFunc(ieeeAddr);
					}}
					btnClass="{defaultClasses} text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
					><XMark size="30" /></Button
				>
			</ButtonGroup>
		</span>
	</p>
</Card>
