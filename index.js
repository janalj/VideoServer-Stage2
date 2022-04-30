// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");
// gets data out of HTTP request body 
// and attaches it to the request object
const app = express();
const bodyParser = require('body-parser');
// create object to interface with express



/////////////////////////////////////
// CALLING sqlWRAP and create the db
const fetch = require("cross-fetch");
// get Promise-based interface to sqlite3
const db = require('./sqlWrap');
// this also sets up the database
/////////////////////////////////////




// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
});

app.use(express.text());
// make all the files in 'public' available 

app.use(bodyParser.json());
// Code in this section sets up an express pipeline

app.use(function(req, res, next) {
  console.log("body contains",req.body);
  next();
});

app.use(express.static("public"));

// if no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/tiktokpets.html");
});

app.post("/videoData", (req, res) =>{
  console.log("sending Response")
  // req.body to display the json , change it back to the object
  // insert the 
  return res.send('recieved POST'); 
});

// Need to add response if page not found!
app.use(function(req, res){
  res.status(404); res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});



/****************************/
/* some database operations */
/****************************/


// test the function that inserts into the database
function databaseCodeExample() {

  console.log("testing database");

  // put the video data into an object
  let vidObj = {
"url": "https://www.tiktok.com/@cheyennebaker1/video/7088856562982423854",
 "nickname": "Cat vs Fish",
 "userid": "ProfAmenta"
   }

 async function insertAndCount(vidObj) {
  
   await insertVideo(vidObj);
   const tableContents = await dumpTable(); 
   console.log(tableContents.length);
   console.log(dumpTable())
   // return the length of the table to see if it's more than 8
   return tableContents.length;
   
 }



insertAndCount(vidObj)
  .catch(function(err) {console.log("DB error!",err)});
  
  
  
  insertVideo(vidObj)
    .then(function() {
      console.log("success!");
    })
    .catch(function(err) {
      console.log("SQL error",err)} );
 
  dumpTable()
  .then(function(result) {
    let n = result.length;
    console.log(n+" items in the database"); })
  .catch(function(err) {
      console.log("SQL error",err)} );
 
  
  getVideo("Cat vs Fish")
    .then(function(result) {
       console.log("row contained",result); 
          })
    .catch(function(err) {
      console.log("SQL error",err)} );

}


// inserting sample to videos.db
databaseCodeExample();

// ******************************************** //
// Define async functions to perform the database 
// operations we need

// An async function to insert a video into the database
async function insertVideo(v) {
  const sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";

await db.run(sql,[v.url, v.nickname, v.userid]);
}

// an async function to get a video's database row by its nickname
async function getVideo(nickname) {

  // warning! You can only use ? to replace table data, not table name or column name.
  const sql = 'select * from VideoTable where nickname = ?';

let result = await db.get(sql, [nickname]);
return result;
}

// an async function to get the whole contents of the database 
async function dumpTable() {
  const sql = "select * from VideoTable";
  
  let result = await db.all(sql);
  return result;
}


// // count function return the number of rows on the database

// async function count(){
//   const sql = "select count(*) from VideoTable";
//   let result = await db.all(sql);
//   return result;
// }
