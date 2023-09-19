<script>
	import { goto } from '$app/navigation';
	import { getTrackingDetails, submitTrackingCheck } from '$lib/parcellab-api.js';

	/**
	 * @type {{ orderNo: any; consignmentNo: any; courier: { prettyname: any; }; tracking_number: any; customFields: { shopifyReturnData: { totalRefundAmountCurrency: any; totalRefundAmount: number; refundedTaxCurrency: any; refundedTax: number; }; }; recipient: any; street: any; city: any; zip_code: any; region: string; country: { name: any; }; email: any; created: string | number | Date; articles: any; } | null}
	 */
	export let tracking = null;

	export async function getTrackingDetailsAndSetData() {
		tracking = await getTrackingDetails();
		tracking?.articles?.forEach((article) => {
			article.acceptedQuantity = 0;
		});
	}

	export async function submitTracking() {
		await submitTrackingCheck(tracking);
		goto('/')
	}
</script>

{#await getTrackingDetailsAndSetData()}
	<main class="pt-8 pb-5">
		<header class="relative">
			<div class="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
				<div
					class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"
				>
					<div class="flex items-center gap-x-6">
						<h1>
							<div class="text-sm leading-6 text-gray-500">
								<span class="h-2 w-12 inline-block bg-slate-300 rounded animate-pulse"></span>
								&bull;
								<span class="h-2 w-12 inline-block bg-slate-300 rounded animate-pulse"></span>
							</div>
							<span class="h-2 w-36 inline-block bg-slate-500 rounded animate-pulse"></span>
						</h1>
					</div>
				</div>
			</div>
		</header>

		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div
				class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				<!-- Summary (right side) -->
				<div class="lg:col-start-3 lg:row-end-1">
					<div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
						<dl class="flex flex-wrap py-6">
							<div class="flex-auto pl-6">
								<dt class="text-sm font-semibold leading-6 text-gray-900">
									<span class="h-2 w-12 inline-block bg-slate-500 rounded animate-pulse"></span>
								</dt>
								<dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
									<span class="h-2 w-20 inline-block bg-slate-300 rounded animate-pulse"></span>
								</dd>
							</div>
							<div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
								<dt class="flex-none">
									<svg
										class="h-6 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
											clip-rule="evenodd"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-900">
									<span class="h-2 w-20 inline-block bg-slate-300 rounded animate-pulse"></span>
									<br />
									<span class="h-2 w-24 inline-block bg-slate-300 rounded animate-pulse"></span>
									<br />
									<span class="h-2 w-12 inline-block bg-slate-300 rounded animate-pulse"></span>
									<br />
									<span class="h-2 w-20 inline-block bg-slate-300 rounded animate-pulse"></span>
								</dd>
							</div>
							<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
								<dt class="flex-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-5 text-gray-400"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-500">
									<span class="h-2 w-28 inline-block bg-slate-300 rounded animate-pulse"></span>	
								</dd>
							</div>
							<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
								<dt class="flex-none">
									<span class="sr-only">Returned on</span>
									<svg
										class="h-6 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
										/>
										<path
											fill-rule="evenodd"
											d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
											clip-rule="evenodd"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-500">
									<span class="h-2 w-20 inline-block bg-slate-300 rounded animate-pulse"></span>
								</dd>
							</div>
						</dl>
					</div>
				</div>

				<!-- Articles (left side) -->
				<div
					class="-mx-4 px-6 py-6 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2 bg-white"
				>
					<h2 class="text-sm font-semibold leading-6 text-gray-900">
						<span class="h-2 w-24 inline-block bg-slate-500 rounded animate-pulse"></span>
					</h2>

					<ul role="list" class="divide-y divide-gray-100">

							<li class="grid grid-cols-4 gap-4 pt-8 pb-8">
								<div>
									<div
										class="w-full h-28 rounded border border-gray-200 bg-gray-50 animate-pulse"
									/>
								</div>
								<div class="col-span-3">
									<div class="grid grid-cols-3 gap-4">
										<div class="col-span-3">
											<p class="text-lg font-semibold leading-6 text-gray-900">
												<span class="h-2 w-12 inline-block bg-slate-500 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-36 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-32 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-28 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
										</div>
									</div>
								</div>
							</li>

							<li class="grid grid-cols-4 gap-4 pt-8 pb-8">
								<div>
									<div
										class="w-full h-28 rounded border border-gray-200 bg-gray-50 animate-pulse"
									/>
								</div>
								<div class="col-span-3">
									<div class="grid grid-cols-3 gap-4">
										<div class="col-span-3">
											<p class="text-lg font-semibold leading-6 text-gray-900">
												<span class="h-2 w-12 inline-block bg-slate-500 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-36 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-32 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												<span class="h-2 w-28 inline-block bg-slate-300 rounded animate-pulse"></span>
											</p>
										</div>
									</div>
								</div>
							</li>

					</ul>
				</div>
			</div>
		</div>
	</main>
{:then}
	<main class="pt-8 pb-5">
		<header class="relative">
			<div class="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
				<div
					class="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none"
				>
					<div class="flex items-center gap-x-6">
						<h1>
							<div class="text-sm leading-6 text-gray-500">
								Order
								<span class="text-gray-700">
									{tracking?.orderNo}
								</span>
								&bull; RMA
								<span class="text-gray-700">
									{tracking?.consignmentNo}
								</span>
							</div>
							<div class="mt-1 text-base font-semibold leading-6 text-gray-900">
								{tracking?.courier?.prettyname}
								{tracking?.tracking_number}
							</div>
						</h1>
					</div>
					<div class="flex items-center gap-x-4 sm:gap-x-6">
						<button
							on:click={getTrackingDetailsAndSetData}
							class="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
						>
							<div class="inline-block">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-3 h-3"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</div>

							Reset
						</button>
					</div>
				</div>
			</div>
		</header>

		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div
				class="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				<!-- Summary (right side) -->
				<div class="lg:col-start-3 lg:row-end-1">
					<h2 class="sr-only">Summary</h2>
					<div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
						<dl class="flex flex-wrap py-6">
							<div class="flex-auto pl-6">
								<dt class="text-sm font-semibold leading-6 text-gray-900">Refund</dt>
								<dd class="mt-1 text-base font-semibold leading-6 text-gray-900">
									{tracking?.customFields?.shopifyReturnData?.totalRefundAmountCurrency}
									{tracking?.customFields?.shopifyReturnData?.totalRefundAmount.toFixed(2)}
									<span class="mt-1 text-sm font-normal">
										+
										{tracking?.customFields?.shopifyReturnData?.refundedTaxCurrency}
										{tracking?.customFields?.shopifyReturnData?.refundedTax.toFixed(2)} tax
									</span>
								</dd>
							</div>
							<div class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
								<dt class="flex-none">
									<span class="sr-only">Customer</span>
									<svg
										class="h-6 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
											clip-rule="evenodd"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-900">
									<span class="font-medium">
										{tracking.recipient}
									</span>
									<br />
									{tracking.street}
									<br />
									{tracking.city}
									{tracking.zip_code}, {tracking.region.split('-')[1]}
									<br />
									{tracking.country.name}
								</dd>
							</div>
							<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
								<dt class="flex-none">
									<span class="sr-only">Email</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-6 w-5 text-gray-400"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-500">{tracking.email}</dd>
							</div>
							<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
								<dt class="flex-none">
									<span class="sr-only">Returned on</span>
									<svg
										class="h-6 w-5 text-gray-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"
										/>
										<path
											fill-rule="evenodd"
											d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
											clip-rule="evenodd"
										/>
									</svg>
								</dt>
								<dd class="text-sm leading-6 text-gray-500">
									<time datetime="2023-01-31">
										{new Intl.DateTimeFormat('en-US', {
											dateStyle: 'medium',
											timeStyle: 'medium'
										}).format(new Date(tracking.created))}
									</time>
								</dd>
							</div>
						</dl>
					</div>
				</div>

				<!-- Articles (left side) -->
				<div
					class="-mx-4 px-6 py-6 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2 bg-white"
				>
					<h2 class="text-sm font-semibold leading-6 text-gray-900">Returned Items</h2>

					<ul role="list" class="divide-y divide-gray-100">
						{#each tracking?.articles as article}
							<li class="grid grid-cols-4 gap-4 pt-8 pb-8">
								<div>
									<img
										class="h-auto w-full rounded border border-gray-300"
										src={article.articleImageUrl}
										alt={article.articleName}
									/>
								</div>
								<div class="col-span-3">
									<div class="grid grid-cols-3 gap-4">
										<div class="col-span-3">
											<p class="text-lg font-semibold leading-6 text-gray-900">
												{article.articleName}
											</p>
											<p class="mt-1 truncate text-sm leading-5 text-gray-500">
												Article no.: {article.articleNo}
												&bull;
												{tracking?.customFields?.shopifyReturnData?.totalRefundAmountCurrency}
												{article.price}
												&bull;
												<a href={article.articleUrl} target="_blank" class="underline">
													View product page
												</a>
												<br />
												Return reason:
												<span class="font-bold">{article.prettyReturnReason}</span>
											</p>
										</div>
										<div>
											<div class="h-20 rounded-md bg-gray-100 px-3 py-2">
												<p class="text-2xl font-semibold font-mono text-center leading-0">
													{article.quantity}
												</p>
												<p
													class="text-sm font-normal font-sans text-gray-700 mt-0 pt-1 text-center"
												>
													<span class="hidden md:inline"> expected </span>
													qty
												</p>
											</div>
										</div>
										<div>
											<button
												on:click={() => {
													article.checkInModal = true;
												}}
												class="h-20 rounded-md px-0 py-2 sm:text-lg text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 w-full {article.accepted
													? 'bg-gray-400 hover:bg-gray-400'
													: article.rejected
													? 'bg-red-600 hover:bg-red-700'
													: 'bg-red-500 hover:bg-red-600'}"
												disabled={article.accepted || article.rejected}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-5 h-5 mx-auto"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												{article.rejected
													? article.rejectionReason === 'other'
														? 'Rejected'
														: article.rejectionReason === 'missing_quantity'
														? 'Missing'
														: article.rejectionReason === 'quality_issue'
														? 'Defective'
														: 'Rejected'
													: 'Not okay'}
											</button>
										</div>
										<div>
											<button
												on:click={() => {
													article.accepted = true;
													article.acceptedQuantity = article.quantity;
												}}
												class="h-20 rounded-md px-0 py-2 sm:text-lg text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 w-full {article.accepted
													? 'bg-emerald-600'
													: article.rejected
													? 'bg-gray-400 hover:bg-gray-400'
													: 'bg-emerald-400 hover:bg-emerald-600'}"
												disabled={article.accepted || article.rejected}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-5 h-5 mx-auto"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												{#if article.accepted}
													Approved
												{:else}
													Approve
													{#if article.quantity > 1}
														all {article.quantity}
													{/if}
												{/if}
											</button>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</main>

	<footer class="w-full text-center sticky bottom-0 p-4 bg-white border-gray-200 border-t-2">
		<div class="flex gap-8 items-center justify-center">
			<div>
				<p class="text-sm text-gray-700">
					{tracking?.articles?.filter((article) => article?.accepted || article?.rejected).length} of
					{tracking?.articles?.length} lines checked
				</p>
			</div>
			<div>
				<button
					class="rounded-md px-4 py-2 sm:text-lg text-sm font-semibold text-white shadow-sm {tracking?.articles?.some(
						(article) => !article?.accepted && !article?.rejected
					)
						? 'bg-blue-100'
						: 'bg-blue-500'}"
					disabled={tracking?.articles?.some((article) => !article?.accepted && !article?.rejected)}
					on:click={submitTracking}
				>
					Close return
				</button>
			</div>
		</div>
	</footer>

	{#if tracking?.articles?.some((article) => article?.checkInModal)}
		<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

			{#each tracking?.articles.filter((article) => article?.checkInModal) as article}
				<div class="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div
						class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<div
							class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-8/12 w-11/12"
						>
							<div class="p-6">
								<div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										on:click={() => {
											article.checkInModal = false;
										}}
										type="button"
										class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									>
										<span class="sr-only">Close</span>
										<svg
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>

								<div class="grid grid-cols-4 gap-4">
									<div class="sm:col-span-1 col-span-4">
										<img
											class="h-auto w-full rounded border border-gray-300"
											src={article.articleImageUrl}
											alt={article.articleName}
										/>
									</div>
									<div class="col-span-3">
										<p class="text-2xl mt-4 font-semibold leading-6 text-gray-900">
											{article.articleName}
										</p>
										<p class="mt-2 text-md leading-5 text-gray-500">
											Article no.: {article.articleNo}
											&bull;
											{tracking?.customFields?.shopifyReturnData?.totalRefundAmountCurrency}
											{article.price.toFixed(2)}
											&bull;
											<a href={article.articleUrl} target="_blank" class="underline">
												View product page
											</a>
										</p>
										<p class="text-md text-gray-900 mt-4">
											Expected qty:
											<span class="font-bold">{article.quantity}</span>
											<br />
											Return reason:
											<span class="font-bold">{article.prettyReturnReason}</span>
										</p>
									</div>
								</div>

								{#if article.quantity > 1}
									<div class="grid grid-cols-3 gap-4 rounded border border-gray-300 mt-4 p-4">
										<div class="sm:col-span-1 col-span-3">
											<p class="text-md font-semibold text-gray-900">Accepted quantity</p>
										</div>
										<div class="sm:col-span-1 col-span-3">
											<div class="flex rounded-md shadow-sm">
												<button
													type="button"
													class="relative -mr-px inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-xl font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 {article.acceptedQuantity ===
														0 && 'bg-gray-50 text-gray-300'}"
													disabled={article.acceptedQuantity === 0}
													on:click={() => {
														if (article.acceptedQuantity > 0) {
															article.acceptedQuantity--;
														}
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="w-8 h-8"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</button>
												<div class="relative flex flex-grow items-stretch focus-within:z-10">
													<input
														type="acceptedQuantity"
														name="acceptedQuantity"
														id="acceptedQuantity"
														class="block w-full rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6 text-center font-bold"
														placeholder="0"
														bind:value={article.acceptedQuantity}
													/>
												</div>
												<button
													type="button"
													class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-xl font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 {article.acceptedQuantity ===
														article.quantity && 'bg-gray-50 text-gray-300'}"
													disabled={article.acceptedQuantity === article.quantity}
													on:click={() => {
														if (article.acceptedQuantity < article.quantity) {
															article.acceptedQuantity++;
														}
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="w-8 h-8"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</button>
											</div>
										</div>
										<div class="sm:col-span-1 col-span-3">
											<p class="text-xs text-gray-500 sm:pt-6">
												Quantity of {article.quantity - article.acceptedQuantity} will
												<b>not</b> be accepted and refunded.
											</p>
										</div>
									</div>
								{/if}

								<div class="grid grid-cols-3 gap-4 rounded border border-gray-300 mt-4 p-4">
									<div class="col-span-3">
										<p class="text-md font-semibold text-gray-900">Select reason for rejection</p>
									</div>
									<div>
										<button
											class="rounded-md px-0 py-2 sm:text-lg text-sm font-semibold hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 w-full {article.rejectionReason ===
											'missing_quantity'
												? 'bg-blue-500 text-white'
												: 'bg-gray-300 hover:bg-gray-500 text-gray-600'}"
											on:click={() => {
												article.rejectionReason = 'missing_quantity';
											}}
										>
											Missing
										</button>
									</div>
									<div>
										<button
											class="rounded-md px-0 py-2 sm:text-lg text-sm font-semibold hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 w-full {article.rejectionReason ===
											'quality_issue'
												? 'bg-blue-500 text-white'
												: 'bg-gray-300 hover:bg-gray-500 text-gray-600'}"
											on:click={() => {
												article.rejectionReason = 'quality_issue';
											}}
										>
											Defective
										</button>
									</div>
									<div>
										<button
											class="rounded-md px-0 py-2 sm:text-lg text-sm font-semibold hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 w-full {article.rejectionReason ===
											'other'
												? 'bg-blue-500 text-white'
												: 'bg-gray-300 hover:bg-gray-500 text-gray-600'}"
											on:click={() => {
												article.rejectionReason = 'other';
											}}
										>
											Other
										</button>
									</div>
								</div>
							</div>

							<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="button"
									class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-blue-400 sm:ml-3 sm:w-auto sm:text-lg text-sm {!article.rejectionReason &&
										'opacity-50 cursor-not-allowed'}"
									disabled={!article.rejectionReason}
									on:click={() => {
										article.checkInModal = false;
										article.rejected = true;
									}}
								>
									Reject
									{#if article.quantity > 1}
										{article.quantity - article.acceptedQuantity} of {article.quantity}
									{/if}
									{#if article.rejectionReason}
										as
										{#if article.rejectionReason === 'missing_quantity'}
											missing
										{:else if article.rejectionReason === 'quality_issue'}
											defective
										{:else if article.rejectionReason === 'other'}
											other
										{/if}
									{/if}
								</button>
								<button
									type="button"
									class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-lg text-sm"
									on:click={() => {
										article.checkInModal = false;
									}}>Cancel</button
								>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
{:catch error}
	<h1>Error: {error}</h1>
{/await}
