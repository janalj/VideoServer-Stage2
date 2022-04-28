let button = document.getElementById("continue");
button.addEventListener("click",buttonPress);

// given function that sends a post request
async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data };
  console.log("about to send post request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

