// End-to-end check against a running preview server.
// Run: npm run build && npx vite preview --port 4173 &  then  node scripts/e2e.mjs [screenshot-dir]
import assert from 'node:assert/strict'
import { chromium, devices } from 'playwright'

const URL = process.env.APP_URL ?? 'http://127.0.0.1:4173/'
const shots = process.argv[2]
const shot = (page, name, fullPage = true) => (shots ? page.screenshot({ path: `${shots}/${name}.png`, fullPage }) : null)

const browser = await chromium.launch()
const context = await browser.newContext({ ...devices['iPhone 15 Pro'] })
const page = await context.newPage()
const problems = []
page.on('pageerror', (e) => problems.push(String(e)))
page.on('response', (r) => r.status() >= 400 && problems.push(`${r.status()} ${r.url()}`))

// Wednesday 14 Oct 2026
await page.clock.install({ time: new Date(2026, 9, 14, 9, 0, 0) })
await page.goto(URL)
await page.evaluate(() => localStorage.clear())
await page.reload()

assert.equal(await page.locator('h1').innerText(), 'Back & Posture')
assert.equal(await page.locator('.card').count(), 4)
await shot(page, 'today')

// Open an exercise, set the weight, mark it done
await page.locator('.card').first().click()
assert.equal(await page.locator('h1').innerText(), 'Lat Pulldown')
assert.equal(await page.locator('.amount').innerText(), '3 sets × 12 reps')
await page.getByLabel('More weight').click()
await page.getByLabel('More weight').click()
assert.equal(await page.locator('.weight-value').innerText(), '5 kg')
await shot(page, 'exercise')
await page.getByRole('button', { name: /^Done/ }).click()
assert.equal(await page.locator('.progress').innerText(), '1 of 4 done')
assert.deepEqual(await page.locator('.card-weight').allInnerTexts(), ['Last time: 5 kg'])

// Ticks and weight survive a reload
await page.reload()
assert.equal(await page.locator('.progress').innerText(), '1 of 4 done')
assert.deepEqual(await page.locator('.card-weight').allInnerTexts(), ['Last time: 5 kg'])

// Finish the workout
for (let i = 1; i < 4; i++) {
  await page.locator('.card').nth(i).click()
  await page.getByRole('button', { name: /^Done/ }).click()
}
assert.equal(await page.locator('h1').innerText(), 'Workout complete!')
assert.match(await page.locator('.complete-streak').innerText(), /^1\s+day in a row$/)
await shot(page, 'complete', false)

await page.getByRole('button', { name: /history/i }).click()
assert.deepEqual(await page.locator('.cal-done').allInnerTexts(), ['14'])
await shot(page, 'history')

// Every day of the week renders with working pictures, including every exercise screen
const expected = { 11: 0, 12: 4, 13: 5, 14: 4, 15: 5, 16: 5, 17: 5 }
for (const [date, count] of Object.entries(expected)) {
  await page.clock.setFixedTime(new Date(2026, 9, Number(date), 9, 0, 0))
  await page.reload()
  assert.equal(await page.locator('.card').count(), count, `cards on ${date} Oct`)
  for (let i = 0; i < count; i++) {
    await page.locator('.card').nth(i).click()
    await page.locator('.demo img').first().waitFor()
    await page.waitForFunction(() => [...document.images].every((img) => img.complete))
    const broken = await page.evaluate(() => [...document.images].filter((img) => !img.naturalWidth).map((img) => img.src))
    assert.deepEqual(broken, [], 'broken demo images')
    await page.getByRole('button', { name: /Back/ }).click()
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'sideways scroll')
}

// Rest day, then choose another day's workout
await page.clock.setFixedTime(new Date(2026, 9, 11, 9, 0, 0))
await page.reload()
assert.equal(await page.locator('h1').innerText(), 'Rest Day')
await shot(page, 'rest')
await page.getByRole('button', { name: 'Do a different day' }).click()
await page.locator('.daypick-btn').nth(1).click()
assert.equal(await page.locator('h1').innerText(), 'Legs')
assert.equal(await page.locator('.card').count(), 5)

// Offline: app and pictures still load from the service worker, video shows a message
await page.clock.setFixedTime(new Date(2026, 9, 14, 9, 0, 0))
await page.reload()
await page.evaluate(() => navigator.serviceWorker.ready)
await page.waitForTimeout(1500)
await context.setOffline(true)
await page.reload()
assert.equal(await page.locator('h1').innerText(), 'Back & Posture')
await page.locator('.card').nth(1).click()
await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0))
assert.match(await page.locator('.note').innerText(), /needs internet/)
await shot(page, 'offline')
await context.setOffline(false)

assert.deepEqual(problems, [], 'page errors or failed requests')
await browser.close()
console.log('e2e ok')
