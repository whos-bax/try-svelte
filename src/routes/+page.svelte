<!-- src/routes/+page.svelte -->

<script>
	let data = 'Welcome to the Home Page!';
</script>

<section class="page-content">
	<h1>{data}</h1>
	<p>This is the content of the root page.</p>
</section>

<style>
	.page-content {
		padding: 2rem;
		background: #e0e0e0;
	}
</style>
