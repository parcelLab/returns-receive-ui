<script>
	import { base } from '$app/paths';
	import { createCookie } from '$lib/cookie';
	import { onMount } from 'svelte';

	export let scanAsInput = '';
	export let connectionTokenInput = '';
	export let autoApproveAmountInput = '';
	export let secondsUntilRedirect = 5;

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		scanAsInput = params.get('scanAs') || '';
		connectionTokenInput = params.get('connectionToken') || '';
		autoApproveAmountInput = params.get('autoApproveAmount') || '';

		if (scanAsInput) {
			createCookie('scanAs', scanAsInput);
		}

		if (connectionTokenInput && /^\d{3,7}\$[a-zA-Z0-9]{48}$/.test(connectionTokenInput)) {
			createCookie('connectionToken', connectionTokenInput);
		}

		if (autoApproveAmountInput && /^\d+$/.test(String(autoApproveAmountInput))) {
			createCookie('autoApproveAmount', autoApproveAmountInput);
		}

		function countdown() {
			if (secondsUntilRedirect === 0) {
				window.location.href = `${base}/`;
			} else {
				setTimeout(() => {
					secondsUntilRedirect--;
					countdown();
				}, 1000);
			}
		}
		countdown();
	});
</script>

<div class="overflow-hidden rounded-md bg-white shadow m-8 max-w-4xl mx-auto">
	<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
			<div class="ml-4 mt-2">
				Forwarding in {secondsUntilRedirect} seconds...
			</div>
		</div>
	</div>
</div>

<div class="overflow-hidden rounded-md bg-white shadow m-8 max-w-4xl mx-auto">
	<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
			<div class="ml-4 mt-2">
				<h3 class="text-base font-semibold leading-6 text-gray-900">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="inline-block w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
						/>
					</svg>
					Auto-configured
				</h3>
			</div>
			<div class="ml-4 mt-2 flex-shrink-0">
				<a
					href="{base}/"
					type="button"
					class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					OK to start scanning
				</a>
			</div>
		</div>
	</div>

	<ul role="list" class="divide-y divide-gray-200">

		{#if scanAsInput}
			<li class="px-6 py-4">
				<div>
					<label for="scan-as" class="block text-sm font-medium leading-6 text-gray-900">
						Scan as
					</label>
					<div class="mt-2">
						<input
							bind:value={scanAsInput}
							type="text"
							name="scan-as"
							id="scan-as"
							class="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
							disabled
						/>
					</div>
				</div>
			</li>
		{/if}

		{#if connectionTokenInput && /^\d{3,7}\$[a-zA-Z0-9]{48}$/.test(connectionTokenInput)}
			<li class="px-6 py-4">
				<div>
					<label for="connection-token" class="block text-sm font-medium leading-6 text-gray-900">
						Connection Token
					</label>
					<div class="mt-2">
						<input
							bind:value={connectionTokenInput}
							type="text"
							name="connection-token"
							id="connection-token"
							class="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
							disabled
						/>
					</div>
				</div>
			</li>
		{/if}

		{#if autoApproveAmountInput && /^\d+$/.test(String(autoApproveAmountInput))}
			<li class="px-6 py-4">
				<div>
					<label for="scan-as" class="block text-sm font-medium leading-6 text-gray-900">
						Auto-approve
					</label>
					<div class="mt-2">
						<input
							bind:value={autoApproveAmountInput}
							type="number"
							name="auto-approve-amount"
							id="auto-approve-amount"
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
							placeholder="100"
						/>

						<p class="mt-2 text-sm text-gray-400 font-light">
							<span class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
								<svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
									<circle cx="3" cy="3" r="3" />
								</svg>
								Active
							</span>
						</p>
					</div>
				</div>
			</li>
		{/if}
	</ul>
</div>
