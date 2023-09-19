# returns-receive-ui

A simple UI to accept or reject a digital return

[See a demo video on desktop here (with commentary)](https://s.tape.sh/hGrVoVzk)

[See a demo video on mobile here](https://parcellab-my.sharepoint.com/:v:/p/julian/EQP6SUFvhSBDht7jyX8pyJsBivN1kWJBPODPbXCGzCNzcA?e=PKCL1y&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZyIsInJlZmVycmFsQXBwUGxhdGZvcm0iOiJXZWIiLCJyZWZlcnJhbE1vZGUiOiJ2aWV3In19)

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


---

Created with [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).
