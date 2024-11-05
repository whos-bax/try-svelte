<script lang="ts">
	import { page } from '$app/stores';
	import { sidebarStore } from '../stores/sidebar';

	import BrandLogo from '../components/BrandLogo.svelte';
	import { type ListItemType, mainList, subList } from '$lib/components/Sidebar/menuData';

	$effect(() => {
		const pathname = $page.url.pathname.split('/')[1];
		if ($sidebarStore === '') {
			sidebarStore.set($sidebarStore === pathname ? pathname : 'project');
		}
	});

	function handleMenuClick(event: MouseEvent, item: ListItemType) {
		sidebarStore.set($sidebarStore === item.id ? '' : item.id);

		if (item.children && item.children.length > 0) {
			event.preventDefault();
			console.log('Menu item with children clicked:', item);
		}
	}

	function isChildrenExist(item: ListItemType): boolean {
		return !!item.children && item.children.length > 0;
	}

	function isSameSidebar(item: ListItemType): boolean {
		return $sidebarStore === item.id;
	}

	function classNameBySidebar(item: ListItemType) {
		return $sidebarStore === item.id ? 'hover' : '';
	}
</script>

<div class="sidebar">
	<BrandLogo />
	<div class="menu-list">
		<ul class="first-menu">
			{#each mainList as item}
				<li class={classNameBySidebar(item)}>
					<a href={item.link} onclick={(event) => handleMenuClick(event, item)}>
						<img class="icon" src="/assets/icons/{item.id}.png" alt={item.id} />
						{item.label}
						{#if isChildrenExist(item)}
							<img class="more-icon" src="/assets/icons/expand-more.png" alt="{item.link}-more" />
						{/if}
					</a>
					<ul
						class="second-menu {isSameSidebar(item) && isChildrenExist(item) ? 'show' : 'hidden'}"
					>
						{#each item.children ?? [] as child}
							<li>
								<a href={child.link} onclick={(event) => handleMenuClick(event, child)}>
									{child.label}
									{#if isChildrenExist(child)}
										<img
											class="more-icon"
											src="assets/icons/expand-more.png"
											alt="{child.link}-more"
										/>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
		<ul class="first-menu">
			{#each subList as item}
				<li>
					<a href={item.link} onclick={(event) => handleMenuClick(event, item)}>
						<img class="icon" src="/assets/icons/{item.id}.png" alt={item.id} />
						{item.label}
						{#if item.children && item.children.length > 0}
							<img class="more-icon" src="assets/icons/expand-more.png" alt="{item.link}-more" />
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.sidebar {
		z-index: 1;
		width: 224px;
		height: 100%;
		display: flex;
		padding: 4rem 1.6rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2.4rem;
		flex-shrink: 0;
		background: var(--background-paper-elevation-1, #fff);
		box-shadow:
			0px 1px 8px 0px rgba(0, 0, 0, 0.12),
			0px 3px 4px 0px rgba(0, 0, 0, 0.14),
			0px 3px 3px -2px rgba(0, 0, 0, 0.2);
	}
	.menu-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		ul {
			&.first-menu {
				padding: 0.8rem 0;
				margin: 0;
				li {
					list-style: none;
					&:hover,
					&.hover {
						background-color: var(--primary-selected);
						transition: ease 0.2s;
						border-radius: var(--border-radius);
					}
					a {
						display: flex;
						align-items: center;
						height: 4.8rem;
						padding: 0.8rem 1.6rem;
						font-size: 1.6rem;
						img {
							width: 2.4rem;
							height: 2.4rem;
							object-fit: contain;
							&.icon {
								margin-right: 3.2rem;
							}
							&.more-icon {
								margin-left: auto;
							}
						}
					}
				}
			}
			&.second-menu {
				overflow: hidden;
				padding: 0 0 0 7.2rem;
				&.show {
					height: 100%;
					padding-bottom: 1rem;
				}
				&.hidden {
					height: 0;
					padding-bottom: 0;
				}
				li {
					list-style: none;
					a {
						color: var(--text-secondary);
						padding: 0;
						height: 3.2rem;
						display: flex;
						font-size: 1.4rem;
					}
				}
			}
		}
	}
</style>
