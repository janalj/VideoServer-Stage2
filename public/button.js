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
    console.log("Response recieved", response);
    sessionStorage.setItem("nickname", nickname);
    window.location = "redirect.html";
  })
  .catch( function(err) {
    console.log("POST request error",err);
  });
}



              //Things to do 

// modify the previous continue button 
// add the database verification for 8 videos 
// only redirect to the redirect.html if data sucesfully inserts to the database




// add a event listener for the My Video Button 
//GET request for the list of videos in the database
// Redirect to the myVideos.html page display them 




// add a event listener for Play Game Button
// GET request for url "/getMostRecent" for the video preview page
// redirect to videoPreview.html page



