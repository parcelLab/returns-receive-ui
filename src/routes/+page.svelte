<script>
	import { getCookie } from '$lib/cookie';
	import { getTrackingId } from '$lib/parcellab-api';
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	onMount(() => {
		if (!/^\d{3,7}\$[a-zA-Z0-9]{48}$/.test(getCookie('connectionToken'))) {
			window.location.href = '/setup';
		} else {
			html5QrcodeScanner = new Html5Qrcode('reader');
		}
	});

	export let scanInput = '';
	export let errorMessage = '';
	export let scanningQr = false;
	/**
	 * @type {Html5Qrcode | null}
	 */
	let html5QrcodeScanner = null;

	export async function submit() {
		try {
			const trackingId = await getTrackingId(scanInput);
			window.location.href = `/tracking?id=${trackingId}`;
		} catch (error) {
			console.log(error);
			errorMessage = error.toString();
		}
	}

	function startScanningQr() {
		scanningQr = true;
		html5QrcodeScanner?.start(
			{ facingMode: 'environment' },
			{ fps: 10, qrbox: { width: 280, height: 280 }, aspectRatio: 1.0 },
			(qrCodeMessage) => {
				console.log(qrCodeMessage);
				scanInput = qrCodeMessage;
				submit();
			},
			(errorMessage) => {
				console.log(errorMessage);
			}
		);
	}

	function stopScanningQr() {
		scanningQr = false;
		html5QrcodeScanner?.stop();
	}
</script>

<div class="overflow-hidden rounded-md bg-white shadow m-8 p-8 hidden sm:block">
	<div>
		{#if errorMessage}
			<p class="mb-4 text-sm text-red-600" id="scan-error">{errorMessage}</p>
		{/if}

		<form on:submit|preventDefault={submit}>
			<div class="flex rounded-md shadow-sm">
				<div class="relative flex flex-grow items-stretch focus-within:z-10">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-5 w-5 text-gray-400"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
							/>
						</svg>
					</div>
					<input
						autofocus
						bind:value={scanInput}
						type="text"
						name="barcode"
						id="barcode"
						class="block w-full rounded-none rounded-l-full border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-2xl text-md"
						placeholder="Scan or enter barcode"
					/>
				</div>
				<button
					on:click={submit}
					type="button"
					class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-full px-8 py-2 text-2xl font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-100 hover:bg-gray-200"
				>
					<span class="hidden md:inline"> Enter </span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>
		</form>
	</div>
</div>

<div class="rounded-md bg-white shadow m-8 p-8 block sm:hidden">
	<div
		class="w-full aspect-square bg-gray-50 border-gray-200 border rounded-lg overflow-hidden flex justify-center items-center"
		id="reader"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-20 h-20 text-gray-400"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
			/>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
			/>
		</svg>
	</div>

	{#if scanningQr}
		<button
			class="w-full bg-gray-50 border-gray-200 border rounded-lg text-sm text-gray-600 mt-4 py-2"
			on:click={stopScanningQr}>Stop camera</button
		>
	{:else}
		<button
			class="w-full bg-gray-50 border-gray-200 border rounded-lg text-sm text-gray-600 mt-4 py-2"
			on:click={startScanningQr}>Start scanning for QR</button
		>
	{/if}

	{#if errorMessage}
		<p
			class="mt-4 text-sm text-red-600 text-center border border-red-200 rounded-lg py-2"
			id="scan-error"
		>
			{errorMessage}
		</p>
	{/if}
</div>
