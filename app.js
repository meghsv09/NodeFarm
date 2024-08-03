//NODE FARM APP CODE
const http = require('http');
const fs = require('fs');
const url = require('url');
const { log } = require('console');

const PORT = process.env.PORT || 8000;

//EXPORT YOUR MODULE
const replaceTemplate = require('./modules/replaceTemplate');

//READ FILES SYNC'LY
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//SERVER
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    // console.log(cardsHtml);
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  }

  //PRODUCT PAGE
  else if (pathname == '/product') {
    const product = dataObj[query.id];
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //ANY OTHER PAGE
  else {
    res.writeHead(200, 'Not Found', { 'Content-type': 'text/html' });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(PORT, () => {
  console.log('Listening to port 8000');
});
