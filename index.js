const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com/gpu/s?k=gpu");

  // Get a screenshot of the page
  await page.screenshot({ path: "gpu.png", fullPage: true });

  // Get a PDF of the page
  await page.pdf({ path: "gpu.pdf", format: "A4" });

  //  Get HTML of the page
  const html = await page.content();

  //  Get text of the page
  const title = await page.evaluate(() => document.title);

  //  Get text of the page
  const text = await page.evaluate(() => document.body.innerText);

  //  Get all links
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );

  await browser.close();
}

run();
