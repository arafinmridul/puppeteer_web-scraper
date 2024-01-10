const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
        "https://cp-algorithms.com/graph/breadth-first-search.html"
    );

    // screenshot of the page
    await page.screenshot({ path: "cpalgos.png", fullPage: true });

    // pdf of the page
    await page.pdf({ path: "cpalgos.pdf", format: "A4" });

    //  page content
    const html = await page.content();

    //  page title
    const title = await page.evaluate(() => document.title);

    //  text of the page
    const text = await page.evaluate(() => document.body.innerText);

    //  embedded links
    const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a"), (e) => e.href)
    );

    // extracting the html to a file
    // try {
    //     fs.writeFileSync("cpalgos.html", html);
    //     console.log("html file has been saved!");
    // } catch (err) {
    //     console.log(err);
    // }

    // get cp problems
    // const problems = await page.evaluate(() =>
    //     Array.from(document.querySelectorAll(".md-typeset ul li a"), (e) => ({
    //         problem: e.innerText,
    //         url: e.href,
    //     }))
    // );

    const problems = await page.$$eval(".md-typeset ul li a", (elements) =>
        elements.map((item) => ({
            problem: item.innerText,
            url: item.href,
        }))
    );

    // save problems to a JSON file
    fs.writeFile("cpalgos.json", JSON.stringify(problems), (err) => {
        if (err) throw err;
        console.log("problems file has been saved!");
    });

    await browser.close();
}

run();
