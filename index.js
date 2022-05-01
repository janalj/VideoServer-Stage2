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

// Handles post requests form the browser to store videoData to the database
app.post("/videoData", async function(req, res){
  console.log("sending Response");
  // parse the JSON body to Javascript Object type
  let info = req.body;
  // create a new object to pass into insertVideo function
  let vidObj = {
    "url": info.TikTokURL ,
    "nickname": info.VideoNickname,
    "userid": info.Username,
    "flag": 1
  }
  
  let result = await dumpTable();
  if(result.length < 8){
    await updateFlag();
    await insertVideo(vidObj);
  }
  else{
    console.log("Database is full");
  }
  
})

/*
app.post("/videoData", (req, res) =>{
  console.log("sending Response");
  // parse the JSON body to Javascript Object type
  let info = req.body;
  
  // create a new object to pass into insertVideo function
  let vidObj = {
    "url": info.TikTokURL ,
    "nickname": info.VideoNickname,
    "userid": info.Username,
    "flag": 1
  }
   
  dumpTable()
    .then(function(result){
      let len = result.length;
      //console.log(len);
      if (len>=0 && len<=7){
        // find the current item with True flag, change it to False
        
        //get the most recent video with the flag value 1
        getMostRecentVideo(1)
          .then(function(result){//console.log(result);
              updateFlag() // change the previous flag value to 0
                .then(function(){
                  insertVideo(vidObj);})// insert new row to the database
                .catch(function(){console.log("Can't change the flag to 0")});
              })
          .catch(function(){console.log("Can't get the most recent video")});
      }
      else{
        // send back a response 
        res.send("database full");  //?
      }
    })
    .catch(function(){
      console.log("Couldn't get the entire table")
    })
    ;
  res.send('recieved POST'); //?
});
*/


//6. get Request gets the most recently added video from database
//NEED TO TEST THIS 
app.get("/getMostRecent", (request, response) => {
  // get the video with flag value of 1
  getMostRecentVideo(1)
    .then(function(result){ 
        console.log(result);     
        // send back response in JSON
        response.json(jsonResult);
    })
    .catch(function(){console.log("No video with flag value 1")});  
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

//Delete everything on the database
db.deleteEverything();

//Inset object

// let vidObj = {
// "url": "https://www.tiktok.com/@cheyennebaker1/video/7088856562982423854",
//  "nickname": "Dog",
//  "userid": "DogeCoin",
//   "flag": 0
//    }

// insertVideo(vidObj);

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
   //return tableContents.length;
   
 }

// insertAndCount(vidObj)
//   .catch(function(err) {console.log("DB error!",err)});
  
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
// databaseCodeExample();

// ******************************************** //
// Define async functions to perform the database 
// operations we need

// An async function to insert a video into the database
async function insertVideo(v) {
  try{
    const sql = "insert into VideoTable (url,nickname,userid,flag) values (?,?,?,TRUE)";

    await db.run(sql,[v.url, v.nickname, v.userid]);
  }
  catch(err){
    console.log(err);
  }
}

// an async function to get a video's database row by its nickname
async function getVideo(nickname) {
  try{
    // warning! You can only use ? to replace table data, not table name or column name.
    const sql = 'select * from VideoTable where nickname = ?';
  
    let result = await db.get(sql, [nickname]);
    return result;
  }
  catch(err){
    console.log(err);
  }
}

// an async function to get the whole contents of the database 
async function dumpTable() {
  try{ 
    const sql = "select * from VideoTable";
    
    let result = await db.all(sql);
    return result;
  }
  catch(err){
    console.log(err);
  }
}

// an async function to get a video if the flag is 1
async function getMostRecentVideo(flag) {
  try{
    // warning! You can only use ? to replace table data, not table name or column name.
    const sql = 'select * from VideoTable where flag = ?';
  
    let result = await db.get(sql, [flag]);
    return result;
  }
  catch(err){
    console.log(err);
  }
}

// An async function to change the flag to False
async function updateFlag() {
  try{  
    const sql = "update VideoTable set flag = 0 where flag = 1";
  
    await db.run(sql);
  }
  catch(err){
    console.log(err);
  }
}





// // count function return the number of rows on the database

// async function count(){
//   const sql = "select count(*) from VideoTable";
//   let result = await db.all(sql);
//   return result;
// }
