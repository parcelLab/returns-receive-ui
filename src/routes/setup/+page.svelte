<script>
	import { createCookie, getCookie } from '$lib/cookie';

	export let scanAsInput = getCookie('scanAs') || '';
	export let connectionTokenInput = getCookie('connectionToken') || '';
	export let autoApproveAmountInput = getCookie('autoApproveAmount') || '0';

	export let connectionTokenInputFaulty = false;
	export let autoApproveAmountInputFaulty = false;

	export const okayInputClasses =
		'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600';
	export const errorInputClasses =
		'pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500';

	export function save() {
		createCookie('scanAs', scanAsInput);

		if (/^\d{3,7}\$[a-zA-Z0-9]{48}$/.test(connectionTokenInput)) {
			createCookie('connectionToken', connectionTokenInput);
		} else {
			connectionTokenInputFaulty = true;
		}

		if (/^\d+$/.test(String(autoApproveAmountInput))) {
			createCookie('autoApproveAmount', autoApproveAmountInput);
		} else {
			autoApproveAmountInputFaulty = true;
		}
	}
</script>

<div class="overflow-hidden rounded-md bg-white shadow m-8 max-w-4xl mx-auto">
	<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
			<div class="ml-4 mt-2">
				<h3 class="text-base font-semibold leading-6 text-gray-900">Setup</h3>
			</div>
			<div class="ml-4 mt-2 flex-shrink-0">
				<button
					on:click={save}
					type="button"
					class="relative inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					Save
				</button>
			</div>
		</div>
	</div>

	<ul role="list" class="divide-y divide-gray-200">
		<li class="px-6 py-4">
			<div>
				<label for="scan-as" class="block text-sm font-medium leading-6 text-gray-900">
					Scan as
					<span class="text-gray-400 font-light">
						(will be shown as scan location for returns tracking)
					</span>
				</label>
				<div class="mt-2">
					<input
						bind:value={scanAsInput}
						type="text"
						name="scan-as"
						id="scan-as"
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
						placeholder="Scans will be shown as done by ..."
					/>
				</div>
			</div>
		</li>

		<li class="px-6 py-4">
			<div>
				<label for="connection-token" class="block text-sm font-medium leading-6 text-gray-900">
					Connection Token
					<span class="text-gray-400 font-light">
						(request from your parcelLab contact person)
					</span>
				</label>
				<div class="mt-2">
					<input
						bind:value={connectionTokenInput}
						type="password"
						name="connection-token"
						id="connection-token"
						class="block w-full rounded-md border-0 py-1.5 {connectionTokenInputFaulty
							? errorInputClasses
							: okayInputClasses} sm:text-sm sm:leading-6"
						placeholder="1612001$xyz"
					/>

					{#if connectionTokenInputFaulty}
						<p class="mt-2 text-sm text-red-600" id="email-error">
							Not a valid input token. Needs to be in format of 7 digits, followed by a $ and then
							48 alphanumeric characters.
						</p>
					{/if}
				</div>
			</div>
		</li>

		<li class="px-6 py-4">
			<div>
				<label for="scan-as" class="block text-sm font-medium leading-6 text-gray-900">
					Auto-approve
					<span class="text-gray-400 font-light">
						(returns below this amount will be automatically approved, set to 0 to disable)
					</span>
				</label>
				<div class="mt-2">
					<input
						bind:value={autoApproveAmountInput}
						type="number"
						name="auto-approve-amount"
						id="auto-approve-amount"
						class="block w-full rounded-md border-0 py-1.5 {autoApproveAmountInputFaulty
							? errorInputClasses
							: okayInputClasses} sm:text-sm sm:leading-6"
						placeholder="100"
					/>

					{#if autoApproveAmountInputFaulty}
						<p class="mt-2 text-sm text-red-600" id="email-error">
							Only numbers are allowed here.
						</p>
					{/if}

					{#if parseInt(autoApproveAmountInput) > 0}
						<p class="mt-2 text-sm text-gray-400 font-light">
							<span class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
								<svg class="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
									<circle cx="3" cy="3" r="3" />
								</svg>
								Active
							</span>
						</p>
					{:else}
						<p class="mt-2 text-sm text-gray-400 font-light">
							<span class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
								<svg class="h-1.5 w-1.5 fill-slate-500" viewBox="0 0 6 6" aria-hidden="true">
									<circle cx="3" cy="3" r="3" />
								</svg>
								Not active
							</span>
						</p>
					{/if}
				</div>
			</div>
		</li>
	</ul>
</div>
