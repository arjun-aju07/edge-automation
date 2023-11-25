import { chromium } from 'playwright'
import { generate } from "random-words"

(async () => {
    // to get profile path of your system, go to 'edge://version' in your edge browser
    const edgeProfilePath = '/Users/arjun/Library/Application Support/Microsoft Edge/Default' // path of profile

    const browser = await chromium.launchPersistentContext(
        edgeProfilePath,
        { channel: 'msedge', headless: false } // set headless to true if you don't want browser to be opened
    )

    const textAreaSelector = '//*[@id="sb_form_q"]'

    console.log('Script execution started')

    const page = await browser.newPage();
    await page.goto('https://www.bing.com')

    await page.waitForLoadState()

    const textArea = page.locator(textAreaSelector)

    for (let i = 0; i < 30; i++) { // searching for 30 times
        const randomWord = generate()

        await textArea.fill(`Meaning for ${randomWord}`)
        await textArea.press('Enter')

        await page.waitForLoadState()

        // Wait for 1 seconds using setTimeout just to ensure we don't get flagged as bot ;)
        await page.evaluate(() => {
            return new Promise(resolve => {
                setTimeout(resolve, 1000)
            })
        })
    }

    console.log('Script execution completed')
    await browser.close()
})()