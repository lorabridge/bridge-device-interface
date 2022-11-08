<script lang="ts">
	import { Card, Table, Button, ButtonGroup, Modal } from 'flowbite-svelte';
	import { Adjustments, Trash } from 'svelte-heros';
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

	let removeModal = false;

	function removeDevice(ieeeAddr: string) {
		fetch('stats/zigbee/remove', {
			method: 'POST',
			body: JSON.stringify({ id: ieeeAddr }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
</script>

<Card>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{devName}
	</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400">
		<Table header={[]} divClass="relative overflow-x-auto sm:rounded-lg border-2 border-dashed">
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
			<ButtonGroup>
				<Button
					name="ButtonRemove"
					color="light"
					textSize="text-xs"
					on:click={() => {
						removeModal = true
					}}
					><Trash class="text-blue-700 dark:text-red-700" />
				</Button>
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
			</ButtonGroup>
		</span>
	</p>
</Card>

<Modal title="Remove Device" bind:open={removeModal} autoclose>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
   Are you sure you want to remove the device <strong>{devName}</strong>?
  </p>

  <svelte:fragment slot='footer'>
    <Button color="red" on:click={() => removeDevice(ieeeAddr)}>Remove</Button>
    <Button color="alternative">Keep</Button>
  </svelte:fragment>
</Modal>
