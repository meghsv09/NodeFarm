"use-strict";

//Module import
const fs = require("fs"); //returns object
const http = require("http");

// //Sync way of reading the file, also called blocking code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}. \n Created on ${Date.now()}. Add text here`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File created and written succssfully');

//Async or Non blovking code

// fs.readFile('./txt/start.txt','utf-8',(err, data) => {
//     console.log(data);
// });

// console.log('reading the file');

//Callback hell
// fs.readFile('./txt/start.txt','utf-8',(err, data1) => {
//     if(err) return console.log('ERROR');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n ${data3}`,'utf-8',err => {
//                 console.log('File written successfully!');
//             });
//         });
//     });
// });

// const server = http.createServer((req, res) => {
//     res.end('Hello World!');
// });

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Listening to reqests on port 8000');
// });

//Read JSON file and parse it
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//Routing
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is Overview");
  } else if (pathName === "/product") {
    res.end("This is Product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, "Not found the page", { "Content-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
  // console.log(__dirname);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to reqests on port 8000");
});
