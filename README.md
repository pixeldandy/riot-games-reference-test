# Riot Games Front-End Exercise - Reference Example Test

Example reference test for Riot Games Front-End Technical Exercise.

This test can be run standalone by cloning this repo and opening "index.html" in a web browser.

Alternatively, if you find issues accessing the remote data (due to browser [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restrictions), it can be run within the context of a web server using the following instructions.

 - Ensure you have the latest version of [Node.js](https://nodejs.org/en/) installed
 - If this is the first time running the server, execute `npm install` on the command line to install the web server
 - Run `npm start` to start up the web server
 - Browse http://localhost:8080 to view the example test

## Production-ready build

To create production-ready versions of the files in this test, execute the following on the command line:

```
npm run build
```

You may then deploy the production-ready code found in the new `dist/` folder to a web server.

## Implementation details

This example implementation of the front-end exercise uses the third-party utility library [Mustache](http://mustache.github.io) to facilitate [JavaScript templating](https://en.wikipedia.org/wiki/JavaScript_templating), parsing the API data into a HTML template structure contained within `<script>` tags on the page. This particular technique ensures that all HTML code is kept within the same file, making maintenance easier.
