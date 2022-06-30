<script>
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		Card,
		Table,
		TableDefaultRow
	} from 'flowbite-svelte';

  import logo from '$lib/assets/logo.webp';
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src={logo}
			class="mr-3 h-6 sm:h-9"
			alt="Lorabridge Logo"
		/>
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

<slot />

<style>
	:global(nav) {
		border-bottom-width: 2px;
		margin-bottom: 1em;
	}
</style>
