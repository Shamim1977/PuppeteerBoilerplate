const os = require('os');
const fs = require ("fs");
const path = require ("path");
const puppeteer = require('puppeteer');

const desktopPath = path.join(os.homedir(), 'Desktop');
const downloadFolderPath = path.join(os.homedir(), 'Downloads');

(async () => {
  try {
    let args = [
        '--enable-features=NetworkService',
        '--ignore-certificate-errors',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--max-old-space-size=20520',
        `--cpu-count=4`,
        '--shm-size=20gb',
        '--disable-gpu',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--disable-notifications',
        '--enable-automation',
        '--enable-audio',
        '--disable-infobars',
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        '--start-maximized',
        '--autoplay-policy=no-user-gesture-required',
        '--blink-settings=imagesEnabled=true',
        '--enable-usermedia-screen-capturing',
    ];
    // Launch the browser
    let boptions = {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        browser: 'chrome',
        args: args,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        headless: false,
        timeout: 0,
        devtools: false,
        slowMo: 0,
        protocolTimeout: 10*60*60*1000 // 10 hours
        //ignoreDefaultArgs: ["--enable-automation"], //--disable-extensions, --mute-audio
    };

    let browser = await puppeteer.launch(boptions);
  
    // Create a new page
    const page = await browser.newPage();
  
    // Navigate to a website
    await page.goto('https://google.com');
  
    // Perform actions on the page
    const title = await page.title();
    console.log(`Page title: ${title}`);
  
    const content = await page.content();
    let out_path = path.join(downloadFolderPath, 'source.html');
    fs.writeFileSync(out_path, content);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
