<script>
	import { onMount } from 'svelte';
	import '../app.css';

	export let path = '/';
	onMount(() => {
		path = window.location.pathname;
	});
	function handleNavigate(event) {
		path = event.view.location.pathname;
	}

	export const activeClassesDesktop = 'border-blue-500 text-gray-900';
	export const inactiveClassesDesktop =
		'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';
</script>

<svelte:window on:click={handleNavigate} />

<div class="min-h-full">
	<nav class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex">
					<div class="flex flex-shrink-0 items-center">
						<img
							class="block h-12 w-auto"
							src="https://cdn.parcellab.com/returns/logos/Parcellab_Glyph_RGB_Color.svg"
							alt="parcelLab"
						/>
					</div>
					<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
						<a
							href="/"
							class="{path === '/' || /^\/tracking\/[a-zA-Z0-9]{24}/.test(path)
								? activeClassesDesktop
								: inactiveClassesDesktop} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>
							Receive Returns

							{#if /^\/tracking\/[a-zA-Z0-9]{24}/.test(path)}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 mx-3"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
									/>
								</svg>
								Details
							{/if}
						</a>
						<a
							href="/setup"
							class="{path === '/setup'
								? activeClassesDesktop
								: inactiveClassesDesktop} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>
							Setup
						</a>
					</div>
				</div>

        <div class="sm:hidden flex items-center -ml-20">
          <a
					href="/"
					class="{path === '/'
						? 'border-blue-500 border-b-2 text-blue-600'
						: ''} block py-2 text-base font-medium"
				>
					Receive Returns
				</a>
        </div>

				<div class="-mr-2 flex items-center sm:hidden">

					<a
            href="/setup"
						type="button"
						class="relative inline-flex items-center justify-center rounded-md bg-white p-2  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {path === '/setup' ? 'text-blue-500' : 'text-gray-400'}"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span class="absolute -inset-0.5" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</nav>

	<div class="py-10">
		<main>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<slot />
			</div>
		</main>
	</div>
</div>
