# My Gym

A home-screen web app for Dad: opens on today's workout, shows 4–5 exercises with sets and reps, a looping demo and a full video for each, remembers the weight he used, and keeps a calendar of the days he went.

No accounts and no server. Everything is saved on his phone.

## Put it on the internet (one time)

1. Create an empty **public** repository on GitHub, for example `gym`.
2. Run:

   ```sh
   git remote add origin git@github.com:<your-username>/gym.git
   git push -u origin main
   npm run deploy
   ```

3. After a minute or two the app is live at `https://<your-username>.github.io/gym/`.
   If it is not, open the repo's Settings → Pages and choose the `gh-pages` branch.

Any other static host works too: run `npm run build` and upload the `dist` folder.

## Install on the iPhone

1. Open the link in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Open it once from the new icon while on Wi-Fi. After that the app and demo pictures work without internet; only the full videos need a connection.

Always open it from the home-screen icon. History is stored inside that icon's app, so deleting the icon erases it.

## Change the routine

Everything is in `src/data/program.ts`: the exercises (name, sets, reps, instructions, video id) and which ones are done on which day. Edit it, then run `npm run deploy` again. His phone picks up the update the next time he opens the app with internet.

Demo pictures live in `public/demos` as `<name>-0.jpg` (start position) and `<name>-1.jpg` (end position). The photos come from the public-domain [free-exercise-db](https://github.com/yuhonas/free-exercise-db).

## Develop

```sh
npm install
npm run dev      # local preview
npm test         # schedule and streak logic
npm run build    # production build in dist/
```

Full browser check at iPhone size (needs `npx playwright install chromium` once):

```sh
npm run build && npx vite preview --port 4173 &
node scripts/e2e.mjs
```

## A note on safety

The routine was chosen to be gentle on the neck, back and shoulders and to suit someone with high blood pressure: mostly machines, light weights, nothing overhead, no breath-holding. It is still a general routine, so have his doctor or physiotherapist look over the exercise list once.
