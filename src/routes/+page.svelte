<!-- src/routes/+page.svelte -->

<script>
	import userApi from '$lib/api/user.ts';
	import projectApi from '$lib/api/project.ts';
	import { getCookieValue } from '$lib/api/common.ts';
	import { goto } from '$app/navigation';

	let isLogin = $state(false);
	let userData = $state();
	let projects = $state();

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

	async function getHandleProject() {
		try {
			const res = await projectApi.getProjectAll();
			if (res.status === 200 && res.data) {
				projects = res.data.projects;
			}
		} catch (e) {
			console.error('getUserInfo', e);
		}
	}

	$effect(() => {
		getUserInfo();
		getHandleProject();
	});
</script>

<section class="page-content">
	<div class="container">
		<h1>유저인가요?: {isLogin ? '로그인' : '게스트'}</h1>
		<p>email : {userData?.user_profile.email}</p>
		<p>username : {userData?.user_profile.username}</p>
	</div>
	<div class="container">
		<div class="title-wrap">
			<h3 class="title">나의 프로젝트</h3>
			<div class="badge" id="owner">owner</div>
		</div>
		<div class="project-wrap">
			{#each projects ?? [] as project}
				<div class="project-card">
					<p class="name">{project.name}</p>
					<p class="description">{project.description}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="container">
		<div class="title-wrap">
			<h3 class="title">초대된 프로젝트</h3>
			<div class="badge" id="member">member</div>
		</div>
	</div>
</section>

<style>
	.page-content {
		display: flex;
		flex-direction: column;
		gap: 4rem;
		padding: 3.2rem 2.4rem;
		background: #e0e0e0;
		font-size: 1.6rem;
	}
	.container {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		.title-wrap {
			padding: 1rem 0.4rem;
			display: flex;
			align-items: center;
			gap: 0.8rem;
			.title {
				font-size: 20px;
				font-style: normal;
				font-weight: 500;
				line-height: 160%; /* 32px */
			}
			.badge {
				display: inline-flex;
				padding: 3px 7px 2px 7px;
				align-items: center;
				border-radius: 99px;
				font-size: 10px;
				font-style: normal;
				font-weight: 500;
				line-height: 14px; /* 140% */
				letter-spacing: -0.5px;
				text-transform: uppercase;
				&#owner {
					color: var(--primary-_states-focusVisible, #00bfa5);
					border: 1px solid var(--primary-_states-focusVisible, #00bfa5);
				}
				&#member {
					color: var(--deepPurple-500, #673ab7);
					border: 1px solid var(--deepPurple-500, #673ab7);
				}
			}
		}
		.project-wrap {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--2, 16px);
			align-self: stretch;

			.project-card {
				display: flex;
				padding: var(--1_5, 12px);
				flex-direction: column;
				gap: 8px;
				flex: 1 0 0;
				height: 131px;
				max-width: 240px;
				align-items: flex-start;
				flex: 1 0 0;
				border-radius: var(--borderRadius, 8px);
				background: var(--background-paper-elevation-0, #fff);

				/* elevation/1 */
				box-shadow:
					0px 1px 3px 0px rgba(0, 0, 0, 0.12),
					0px 1px 1px 0px rgba(0, 0, 0, 0.14),
					0px 2px 1px -1px rgba(0, 0, 0, 0.2);
				.name {
					font-size: 14px;
					font-style: normal;
					font-weight: 500;
					line-height: 157%; /* 21.98px */
					letter-spacing: -0.5px;
				}
				.description {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					align-self: stretch;
					overflow: hidden;
					color: var(--text-secondary, #616161);
					text-overflow: ellipsis;
					/* typography/caption */
					font-size: 12px;
					font-style: normal;
					font-weight: 400;
					line-height: 166%; /* 19.92px */
					letter-spacing: -0.5px;
				}
			}
		}
	}
</style>
