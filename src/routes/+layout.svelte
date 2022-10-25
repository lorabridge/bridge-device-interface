<script>
	import '../app.postcss';
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		Card,
		Table,
		DarkMode
	} from 'flowbite-svelte';

	import logo from '$lib/assets/logo.webp';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
	let activeTabValue = 1;
	const handleClick = (tabValue) => () => {
		activeTabValue = tabValue;
	};
	const btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-2 top-12  md:top-3 md:right-2 z-50';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src={logo} class="mr-3 h-6 sm:h-9" alt="Lorabridge Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Bridge-Devices
		</span>
	</NavBrand>
	<!-- <NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/services">Services</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl> -->
</Navbar>
<DarkMode {btnClass} />

<!-- <Sidebar>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Dashboard"> 
				 <svelte:fragment slot="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
        </svelte:fragment> 
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>  -->

<slot />

<style>
	:global(nav) {
		border-bottom-width: 2px;
		margin-bottom: 1em;
	}
</style>
