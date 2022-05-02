let continueButton = document.getElementById("continue");
continueButton.addEventListener("click",buttonPress);

let myVideosButton = document.getElementById("myVideos");
myVideosButton.addEventListener("click", function(){
  window.location = "myVideos.html"; 
});

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


//Conitnue button pressed on data entry page
function buttonPress() { 
    // Get all the user info.
  let username = document.getElementById("user").value;
  let URL = document.getElementById("URL").value;
  let nickname = document.getElementById("nickname").value;

  let videoData = {
    "Username": username,
    "TikTokURL": URL,
    "VideoNickname": nickname
  };
  
  //post video data to server
  sendPostRequest("/videoData", videoData)
    .then( function (response) {
      // first check the number of videos in the database, if full, send back "databse full"
      // find the "True " flag, change it to False,  insert the new one to True
      console.log("POST request response recieved", response);
      
      //change the redirection to my videoPreview 
      window.location = "videoPreview.html"; 
    })
    .catch( function(err) {
      console.log("POST request error",err);
    });
}//end of buttonPress()


              //Things to do 

// modify the previous continue button 
// add the database verification for 8 videos 
// GET request for url "/getMostRecent" for the video preview page
// redirect to videoPreview.html page



// add a event listener for the My Video Button 
//GET request for the list of videos in the database
// Redirect to the myVideos.html page display them 



// deletion on "x" delete the correspondent data entry from the data base
// remove the block on the front page









