
// send GET request
async function sendGetRequest(url) {
  params = {
    method: 'GET', 
    headers: {'Content-Type': 'application/json'}};
  console.log("about to send get request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

async function setNames(){
  let nameList = await sendGetRequest("/getList");
  let arrayOfObjects = eval(nameList);

  // for loop passing the nickname from the object to textboxes
  for (let i =0; i < arrayOfObjects.length;i++){
    if (i == 0){
      let name1 = document.getElementById("name1");
      name1.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 1){
      let name2 = document.getElementById("name2");
      name2.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 2){
      let name3 = document.getElementById("name3");
      name3.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 3){
      let name4 = document.getElementById("name4");
      name4.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 4){
      let name5 = document.getElementById("name5");
      name5.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 5){
      let name6 = document.getElementById("name6");
      name6.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 6){
      let name7 = document.getElementById("name7");
      name7.textContent = arrayOfObjects[i].nickname;
    };
    if (i == 7){
      let name8 = document.getElementById("name8");
      name8.textContent = arrayOfObjects[i].nickname;
    };
    
  }
  
}

setNames();


// id = "addNew"
// id= "playGame"