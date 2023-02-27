const { ZebrunnerReporter, ZebrunnerService } = require('@zebrunner/javascript-agent-webdriverio');


exports.config = {
    // ====================
    // Runner Configuration
    // ====================
    reporterSyncInterval: 60 * 1000,
    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    protocol: 'https',
    hostname: 'engine.zebrunner.com',
    port: 443,
    path: '/wd/hub',
    user: 'user',
    key: 'key',
 
    capabilities: [{
        maxInstances: 1,
        platformName: 'linux',
        browserName: 'chrome',
        browserVersion: '109.0',
        'zebrunner:enableVideo': true
    }]
 ,
    // ===================
    // Test Configurations
    // ===================

    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: [[ZebrunnerService],
      //   'chromedriver'
    ],
    framework: 'mocha',
    reporters: [
        [
        // replace this ZebrunnerReporter with the code snippet from onboarding wizard
          //-----------------------ZebrunnerReporter-----------------------
            ZebrunnerReporter,
            {
                enabled: true,
                projectKey: 'DEF',
                server: {
                    hostname: 'https://mycompany.zebrunner.com/',
                    accessToken: 'accessToken'
                },
                launch: {
                    displayName: 'Nightly Regression',
                    build: '2.41.2.2431-SNAPSHOT',
                    environment: 'QA',
                    locale: 'en_US',
                    treatSkipsAsFailures: true,

                },
                logs: {
                    pushDelayMillis: 10000,
                    includeLoggerName: true,
                    excludeLoggers: 'webdriver'
                }
            }
            //-----------------------ZebrunnerReporter-----------------------
        ],
             'spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
