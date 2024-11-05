<script>
	import '../app.scss';
	import Sidebar from '../layouts/Sidebar.svelte';
	import Header from '../layouts/Header.svelte';
	let { children } = $props();
</script>

<main class="layout">
	<Sidebar />
	<div class="contents">
		<Header />
		{@render children()}
	</div>
</main>

<style lang="scss">
	.layout {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.contents {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #e0e0e0;
	}
</style>
