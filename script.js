const usernameTextfield = document.getElementById("userName");
const adduserbtn = document.getElementById("addUser");
const btntext = adduserbtn.innerText;
const reocrds = document.getElementById("reocrds");
let userArray = [];
edit_id = null;
let find = 0;
let objstr = localStorage.getItem("user");
if (objstr != null) {
  userArray = JSON.parse(objstr);
}

displayInfo();
adduserbtn.onclick = () => {
  const name = usernameTextfield.value;
    for (let index = 0; index < userArray.length; index++) {
        if ( name == userArray[index].value) {

         
            find++;
         }

   }
  
  // Check same name 
  // userArray.forEach((user, i) => {
  //    if (name!= userArray.name.value) {
  //        find++;
  //    }

  // });
  if ( edit_id!=null) {
    //alert("Please type some name if you type then its already in tasks");
   userArray.splice(edit_id,1,{ name: name })
   edit_id=null;
  }
  else if(name!=""&&find==0){
    userArray.push({ name: name });
  }

  saveInfo(userArray);
  displayInfo();
  usernameTextfield.value = "";
  adduserbtn.innerText= btntext;
};

function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("user", str);
}
function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
       <td><i class="btn text-white fa fa-trash btn-info mx-2" onclick = 'deleteInfo(${i})'></i> 
       <i class="btn btn-danger text-white fa fa-edit" onclick = 'editInfo(${i})'></i></td>
    </tr>`;
  });
  reocrds.innerHTML = statement;
}
function editInfo(id) {
  edit_id = id;
  usernameTextfield.value = userArray[id].name;
  adduserbtn.innerText = "Save Changes";
}
function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
  displayInfo();
}
