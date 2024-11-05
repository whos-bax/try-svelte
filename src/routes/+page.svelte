<!-- src/routes/+page.svelte -->

<script>
	import userApi from '$lib/api/user.ts';
	import { getCookieValue } from '$lib/api/common.ts';
	import { goto } from '$app/navigation';

	let isLogin = $state(false);
	let userData = $state();

	async function getUserInfo() {
		try {
			const token = getCookieValue('jwt');
			const res = await userApi.getUser(token);
			if (res.status === 200 && res.data) {
				isLogin = true;
				userData = res.data;
			} else {
				goto('/login');
			}
		} catch (e) {
			console.error('getUserInfo', e);
			goto('/login');
		}
	}

	$effect(() => {
		getUserInfo();
	});
</script>

<section class="page-content">
	<h1>유저인가요?: {isLogin ? '로그인' : '게스트'}</h1>
	<p>email : {userData?.user_profile.email}</p>
	<p>username : {userData?.user_profile.username}</p>
</section>

<style>
	.page-content {
		padding: 2rem;
		background: #e0e0e0;
		font-size: 1.6rem;
	}
</style>
