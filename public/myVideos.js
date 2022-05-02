// Bug

// first ,insert entries to the data base, then the nicknames will be shown on the textboxes
// but after clicking on the delete button, some of the nickname is still showing even though the entry is deleted on the database
let addNewButton = document.getElementById("addNew");
let playGameButton = document.getElementById("playGame");


// send GET request
async function sendGetRequest(url) {
  params = {
    method: 'GET', 
    headers: {'Content-Type': 'application/json'}};
  console.log("about to send get request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.json(); 
    return data;
  } else {
    throw Error(response.status);
  }
}

async function sendPostDeleteRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'text/plain'},
    body: data };
  console.log("about to send post delete request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}
/*
// initialize the textboxes elements
let name1 = document.getElementById("name1");
let name2 = document.getElementById("name2");
let name3 = document.getElementById("name3");
let name4 = document.getElementById("name4");
let name5 = document.getElementById("name5");
let name6 = document.getElementById("name6");
let name7 = document.getElementById("name7");
let name8 = document.getElementById("name8");
*/
let names = document.getElementsByClassName("videoName");

async function setNames(){
  let nameList = await sendGetRequest("/getList");
  // for loop passing the nickname from the object to textboxes
  for (let i = 0; i < 8; i++){
    if(i < nameList.length){  
      names[i].textContent = nameList[i].nickname;
    }
    else{
      names[i].textContent = "";
    }
  }
 /* 
  for (let i =0; i < arrayOfObjects.length;i++){
    if (i == 0){ name1.textContent = arrayOfObjects[i].nickname; };
    if (i == 1){ name2.textContent = arrayOfObjects[i].nickname; };
    if (i == 2){ name3.textContent = arrayOfObjects[i].nickname; };
    if (i == 3){ name4.textContent = arrayOfObjects[i].nickname; };
    if (i == 4){ name5.textContent = arrayOfObjects[i].nickname; };
    if (i == 5){ name6.textContent = arrayOfObjects[i].nickname; };
    if (i == 6){ name7.textContent = arrayOfObjects[i].nickname; };
    if (i == 7){ name8.textContent = arrayOfObjects[i].nickname; };
    
  }  
 */
}

// get the entire table from the server, then pass them to the text boxes
setNames();

let deleteButtons = document.getElementsByClassName("delete");
// set event listeners for delete buttons
for (let i = 0; i < 8; i++){
  deleteButtons[i].addEventListener("click", deletePress(i));
}

// action for delte button pressed
function deletePress(index){
  sendPostDeleteRequest('/deleteVideo',names[index].textContent)
    .then(function(){
      setNames();
    })
    .catch(function(err){
      console.log("Delete Request Failed ",err);
    });
}
/*
// initializing 8 delete buttons

// delete1 button
let delete1Button = document.getElementById("delete1");
delete1Button.addEventListener("click",delete1Press);

function delete1Press(){
    
    sendPostDeleteRequest('/deleteVideo',name1.textContent)
      .then(function(){
        name1.textContent = "";
        setNames();
      })

      

}

// delete2 button
let delete2Button = document.getElementById("delete2");
delete2Button.addEventListener("click",delete2Press);

function delete2Press(){
    sendPostDeleteRequest('/deleteVideo',name2.textContent)
      .then(function(){
        name2.textContent = "";
        setNames();
      })

}

// delete3 button
let delete3Button = document.getElementById("delete3");
delete3Button.addEventListener("click",delete3Press);

function delete3Press(){
    sendPostDeleteRequest('/deleteVideo',name3.textContent)
      .then(function(){
        name3.textContent = "";
        setNames();
      })

}

// delete4 button
let delete4Button = document.getElementById("delete4");
delete4Button.addEventListener("click",delete4Press);

function delete4Press(){
    sendPostDeleteRequest('/deleteVideo',name4.textContent)
      .then(function(){
        name4.textContent = "";
        setNames();
      })
}

// delete5 button
let delete5Button = document.getElementById("delete5");
delete5Button.addEventListener("click",delete5Press);

function delete5Press(){
    sendPostDeleteRequest('/deleteVideo',name5.textContent)
      .then(function(){
        setNames();
      })

}

// delete6 button
let delete6Button = document.getElementById("delete6");
delete6Button.addEventListener("click",delete6Press);

function delete6Press(){
    sendPostDeleteRequest('/deleteVideo',name6.textContent)
      .then(function(){
        setNames();
      })

}

// delete7 button
let delete7Button = document.getElementById("delete7");
delete7Button.addEventListener("click",delete7Press);

function delete7Press(){
    sendPostDeleteRequest('/deleteVideo',name7.textContent)
      .then(function(){
        setNames();
      })

}

// delete8 button
let delete8Button = document.getElementById("delete8");
delete8Button.addEventListener("click",delete8Press);

function delete8Press(){
    sendPostDeleteRequest('/deleteVideo',name8.textContent)
      .then(function(){
        setNames();
      })

}
*/

