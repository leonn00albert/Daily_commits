/*
Daily Code Challenge: Web Scraper with CLI Input

Objective:
Create a command-line application in JavaScript that accepts a URL input from the user and scrapes data from the webpage.

Requirements:
- The application should be run via the command line interface (CLI).
- It should prompt the user to enter a URL.
- Once the URL is provided, the application should scrape relevant data from the webpage.
- The scraped data could be anything of your choice (e.g., headlines, article titles, product information).
- Display the scraped data to the user in the CLI.

Bonus:
- Implement error handling for invalid URLs or failed requests.
- Allow the user to specify which specific data they want to scrape (e.g., headlines only, product names only).
- Provide options for saving the scraped data to a file.
- Add support for scraping multiple pages from the same website.

Resources:
- Node.js for running JavaScript code on the command line.
- Axios or Fetch API for making HTTP requests.
- Cheerio or Puppeteer for web scraping.
- Commander.js for building command-line interfaces in Node.js.
*/

// Add your code implementation here...
const axios = require('axios');
const cheerio = require('cheerio');

class WebScraper {

    constructor() {
        this.url = '';
    }

    async scrape(url, selector) {
        try {
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);
            const data = $(selector).text();
            console.log(data);
            return data 
        } catch (error) {
            console.error('Error scraping data', error);
        }
    }



}

class Cli {

    constructor() {
        this.scraper = new WebScraper();
        this.fileHandler = new FileHandler();
   
    }

    async start() {
        const url = await this.promptUrl();

        const selector = await this.promptSelector();
        const save = await this.promptSave();
        const data = await this.scraper.scrape(url,selector);

        if(save === 'y'){
            const filename = 'scraped-data.txt';
            this.fileHandler.saveToFile(data, filename);
        }
    }

    async promptUrl() {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            readline.question('Enter a URL: ', (url) => {
                if(!url.startsWith('https://' && url.includes('www.'))){
                    url = 'https://' + url;
                }else if(
                    !url.startsWith('https://www.') &&
                    !url.startsWith('https://')
                ){
                    url = 'https://www.' + url;
                }
             
                resolve(url);
                readline.close();
            });
        });
    }

    async promptSave() {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            readline.question('Save to file? (y/n): ', async (response) => {
                resolve(response);
                readline.close();
            });
        });

    }

    async promptSelector() {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            readline.question('Enter a CSS selector: ', (selector) => {
                resolve(selector);
                readline.close();
            });
        });
    }


}

class FileHandler {
    constructor() {
        this.fs = require('fs');
    }

    saveToFile(data, filename) {
        this.fs.writeFile('files/' + filename, data, (error) => {
            if (error) {
                console.error('Error saving file', error);
            }
            console.log('Data saved to file');
        });
    }

}

const cli = new Cli();
cli.start();