let button = document.getElementById("continue");
button.addEventListener("click",buttonPress);

// given function that sends a post request
async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };
  console.log("about to send post request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}


function buttonPress() { 
    // Get all the user info.
  let username = document.getElementById("user").value;
  let URL = document.getElementById("URL").value;
  let nickname = document.getElementById("nickname").value;

  //let data = username+","+URL+","+nickname;

  // sending data as Json format
  let data = {
    "Username": username,
    "TikTokURL": URL,
    "VideoNickname": nickname
  };
  
  sendPostRequest("/videoData", data)
  .then( function (response) {

    // first check the number of videos in the database, if full, send back "databse full"
    // find the "True " flag, change it to False,  insert the new one to True
    console.log("Response recieved", response);

    //remove sessionStorage
    //sessionStorage.setItem("nickname", nickname);

    
    //change the redirection to my videoPreview 
    window.location = "videoPreview.html"; 
  })
  .catch( function(err) {
    console.log("POST request error",err);
  });
}



              //Things to do 

// modify the previous continue button 
// add the database verification for 8 videos 
// only redirect to the redirect.html if data sucesfully inserts to the database
// GET request for url "/getMostRecent" for the video preview page
// redirect to videoPreview.html page



// add a event listener for the My Video Button 
//GET request for the list of videos in the database
// Redirect to the myVideos.html page display them 


// deletion on "x" delete the correspondent data entry from the data base
// remove the block on the front page









