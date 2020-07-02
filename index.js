const puppeteer = require('puppeteer-core')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
  const page = await browser.newPage()
  await login(page)
  await page.goto(
    'https://itch.io/bundle/download/rY45H2C1WwOkuyQkMPWdltCIXPQh1gC04qylMg9O'
  )

  while (1) {
    let claim = await page.evaluate(() =>
      document.querySelector('button[value="claim"]')
    )

    while (claim == null) {
      const nextPage = await page.evaluate(() =>
        document.querySelector('a[class="next_page button"]')
      )
      if (nextPage == null) break
      await page.click('a[class="next_page button"]')
      await page.waitFor(2000)
      claim = await page.evaluate(() =>
        document.querySelector('button[value="claim"]')
      )
    }

    if (claim === null) break
    await page.click('button[value="claim"]')
    await page.waitFor(2000)
    await page.goBack()
  }

  await browser.close()
})()

const login = async (page) => {
  await page.goto('https://itch.io/login')
  await page.type('input[name="username"]', 'USERNAME/EMAIL')
  await page.type('input[name="password"]', 'PASSWORD')
  await page.click('button[class="button"]')
  await page.waitFor(2000)
  await page.type('input[name="code"]', 'TWO FACTOR CODE')
  await page.click('button[class="button"]')
  await page.waitFor(2000)
}
