const log = require("loglevel")
const { currentTest } = require("@zebrunner/javascript-agent-webdriverio")

describe('Basic reporting test', () => {

    const logger = log.getLogger("LOGGER")

    const url = 'https://www.google.com/';
    const cookiesDialogText = 'Before you continue to Google Search';
    const searschValue = 'Zebrunner'

    before(function () {
        logger.warn('this log message will not be submitted into Zebrunner')
         browser.maximizeWindow();

    });

    beforeEach(function () {
        logger.info(` Test ${this.currentTest.title} satrted `)
    });

    it('Google search', async () => {
       
        logger.info(`Opening ${url}`)
        await browser.url(url)
        currentTest.saveScreenshot(await browser.takeScreenshot())

        logger.info(`Performing search with value: ${searschValue}`)
        await $("//input[@name='q']").setValue(searschValue)
        await browser.keys('Enter')

        logger.info(`Verify first search result contains ${searschValue}`)
        currentTest.saveScreenshot(await browser.takeScreenshot())
        await expect($("//*[@id='search']//a")).toHaveTextContaining(searschValue)
        currentTest.attachArtifactReference("Zebrunner","https://zebrunner.com/")

    })

    afterEach(function () {
        currentTest.saveScreenshot(browser)
        logger.info(` Test  ${this.currentTest.title} finished  as ${this.currentTest.state}`)
    });
})

