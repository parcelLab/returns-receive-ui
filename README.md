# returns-receive-ui

A simple UI to accept or reject a digital return

[See a demo video on desktop here (with commentary)](https://s.tape.sh/hGrVoVzk)

[See a demo video on mobile here](https://parcellab-my.sharepoint.com/:v:/p/julian/EQLTsvUV4ntCl-7O7XXcs-UBe0Xr65CIyKogrFTZB-ZSsg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZyIsInJlZmVycmFsQXBwUGxhdGZvcm0iOiJXZWIiLCJyZWZlcnJhbE1vZGUiOiJ2aWV3In19&e=dzZFYh)

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deployment

No further actions needed, the main branch is deployed via Github Actions to a Github Page.

## Demo Flow

> On Desktop (with USB Barcode Scanner)

Enter returns ID

<img width="640" alt="image" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/550d8bef-5c52-47bb-b022-186a5f2d6f57">

Select items

<img width="640" alt="image" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/b1f600f2-da04-47cf-9c43-78c21c9ecc1a">

Reject partial quantity with reason

<img width="640" alt="image" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/72fb856b-f88e-4a31-ac82-7111c35ff36c">

Close return after all lines are checked

<img width="640" alt="image" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/b3cf9802-7ad0-4dad-8513-b86d4feb5be5">

> On Mobile (using QR codes with device camera)

<img width="200" alt="1_scan-setup-code" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/03b8ea39-40b5-4e4f-be88-0908a9a97c41">
<img width="200" alt="2_start-screen" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/c6dbd15f-61f1-4004-aed0-ecb26de2090f">
<img width="200" alt="3_allow-camera-access" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/20021642-b851-4ffd-a827-452665f4611e">
<img width="200" alt="4_item-select-screen" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/b5b274f1-20fd-40c4-ba4e-7510a9d8de77">
<img width="200" alt="5_approve-line-item" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/66be8223-b681-4920-a26b-69cdb1eb8c3f">
<img width="200" alt="6_reject-detail-screen" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/6d032865-c47e-4797-b03e-95a6649b9952">
<img width="200" alt="7_reject-detail-screen-selected" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/b40debd9-513f-43a8-826b-d3f9e165d630">
<img width="200" alt="8_reject-detail-screen-multi-quantity" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/34dc52de-33b0-4df1-8439-770645c17e9c">
<img width="200" alt="9_close-return" src="https://github.com/parcelLab/returns-receive-ui/assets/625618/ca1f594b-bc5d-41ac-abce-b42840cf42dd">

---

Created with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).
