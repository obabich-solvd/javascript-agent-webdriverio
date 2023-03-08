const log = require('loglevel');
const { currentTest } = require('@zebrunner/javascript-agent-webdriverio');
const { Key } = require('webdriverio');
const { zephyr } = require('@zebrunner/javascript-agent-webdriverio');

describe('Linking test cases to test executions', () => {
  const logger = log.getLogger('LOGGER');

  before(function () {
    logger.warn('This log message will not be submitted into Zebrunner');
    browser.maximizeWindow();
  });

  beforeEach(function () {
    logger.info(`Test ${this.currentTest.title} started`);
  });

  it('Zephyr Squad integration', async () => {
    zephyr.testCaseKey('ZEB-52', 'ZEB-53', 'ZEB-54');

    await browser.url(
      'https://zebrunner.com/documentation/reporting/webdriverio/#zephyr_1'
    );
    currentTest.saveScreenshot(await browser.takeScreenshot());
    logger.info(
      'Example shows how to attach Zerhyr Squad test cases for a specific test'
    );
    await expect(browser).toHaveTitle('WebdriverIO');
  });

  afterEach(function () {
    currentTest.saveScreenshot(browser);
    logger.info(
      `Test ${this.currentTest.title} finished as ${this.currentTest.state}`
    );
  });
});
