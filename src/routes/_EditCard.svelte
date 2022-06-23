<script lang="ts">
	import { Card, Table, Button, Toggle, ButtonGroup, ButtonGroupItem } from 'flowbite-svelte';
	import { Adjustments, Check, X } from 'svelte-heros';
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
	// export let devName: string;
	// export let ieeeAddr: string;
	// export let manufName: string;
	// export let attributes: { [key: string]: boolean };
	// export let cancelFunc = (ieeeAddr: string) => {};
	// export let saveFunc = (ieeeAddr: string) => {};

	let defaultClasses =
		'inline-flex items-center py-0.5 px-1 text-xs font-medium first:rounded-l-lg border-t border-b last:rounded-r-md border-l last:border-r focus:z-10 focus:ring-2';
</script>

<Card header={devName}>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400" slot="paragraph">
		<Table header={[]} divClass="relative overflow-x-auto sm:rounded-lg border-2 border-dashed">
			<!-- <TableDefaultRow items={itemEx} html /> -->
			<tr class="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">ieeeAddr</th>
				<td class="pr-4">{ieeeAddr}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
				<th scope="col" class="px-6 py-3">manufName</th>
				<td class="pr-4">{manufName}</td>
			</tr>
			<tr class="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
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
									label={attribute}
									bind:checked={device['attributes'][attribute]}
								/>
							</li>
						{/each}
					</ul></td
				>
			</tr>
		</Table>
		<span class="float-right space-x-2 my-2">
			<!-- <Button name="Button" btnColor="light" textSize="text-xs">
				<Adjustments class="text-blue-700 dark:text-red-700" />
			</Button> -->
			<ButtonGroup>
				<ButtonGroupItem
					on:click={() => {
						saveFunc(ieeeAddr);
					}}
					btnClass="{defaultClasses} text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 "
					><Check size="30" /></ButtonGroupItem
				>
				<ButtonGroupItem
					on:click={() => {
						cancelFunc(ieeeAddr);
					}}
					btnClass="{defaultClasses} text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
					><X size="30" /></ButtonGroupItem
				>
			</ButtonGroup>
		</span>
	</p>
</Card>
