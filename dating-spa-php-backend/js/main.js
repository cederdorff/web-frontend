// ========== GLOBAL VARIABLES ==========
let _users = [];
const _baseUrl = "backend/userService.php";
let _selectedUserId;

// ========== READ ==========
/**
 * Fetches user data from php backend services 
 */
async function loadUsers() {
  const url = _baseUrl + "?action=getUsers";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _users = data;
  appendUsers(_users);
}

/**
 * Appends users to the DOM
 */
function appendUsers(users) {
  let htmlTemplate = "";
  for (const user of users) {
    htmlTemplate += /*html*/ `
      <article onclick="showUser(${user.id})">
      <img src="backend/small/${user.image || "placeholder.jpg"}">
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}, Looking for: ${user.lookingFor}</p>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

/**
 * returns matches based on given userId
 */
async function getMatches(userId) {
  const url = `${_baseUrl}?action=getMatches&userid=${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function showUser(userId) {
  _selectedUserId = userId;
  localStorage.setItem("selectedUserId", _selectedUserId);
  const matchData = await getMatches(userId);
  console.log(matchData);
  appendMatches(matchData);
  navigateTo("#/user");
}

function appendMatches(data) {
  let htmlTemplate = /*html*/ `
    <article class="selectedUser">
      <img src="backend/small/${data.selectedUser.image}">
        <h3>${data.selectedUser.firstname} ${data.selectedUser.lastname}</h3>
        <p>Age: ${data.selectedUser.age}, Gender: ${data.selectedUser.gender}</p>
        <p>Number of matches: ${data.matchCount}</p>
        <button type="button" class="update" onclick="showUserUpdate(${data.selectedUser.id})">Update</button>
        <button type="button" class="delete" onclick="deleteUser(${data.selectedUser.id})">Delete</button>
    </article>
  `;

  for (const user of data.matches) {
    htmlTemplate += /*html*/ `
      <article onclick="showUser(${user.id})">
        <img src="backend/small/${user.image}">
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}</p>
      </article>
      `;
  }
  document.querySelector("#grid-matches").innerHTML = htmlTemplate;
  document.querySelector("#user .title").innerHTML = data.selectedUser.firstname;
  showLoader(false);
}

// ========== IMAGE UPLOAD ==========

async function uploadImage(imageFile) {
  let formData = new FormData();
  formData.append("fileToUpload", imageFile);

  const response = await fetch("backend/upload.php", {
    method: "POST",
    headers: { "Access-Control-Allow-Headers": "Content-Type" },
    body: formData
  });
  // waiting for the result
  const result = await response.json();
  console.log(result);
  return result;
}

// ========== CREATE ==========

async function createUserEvent() {
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const age = document.querySelector("#age").value;
  const haircolor = document.querySelector("#haircolor").value;
  const countryName = document.querySelector("#country").value;
  const gender = document.querySelector("#gender").value;
  const lookingFor = document.querySelector("#lookingFor").value;
  const imageFile = document.querySelector("#fileToUpload").files[0];

  if (firstname && lastname && age && haircolor && countryName && gender && lookingFor && imageFile) {
    const imageResult = await uploadImage(imageFile);
    if (imageResult.status === "success") {
      createUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor, imageResult.data.fileName);
    }
  } else {
    alert(" Please fill in all fields.");
  }
}

/**
 * creates a new user and saving in JSON file using the php backend service
 */
async function createUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor, image) {
  const id = Date.now(); // dummy generated user id
  const newUser = { // declaring a new js object with the form values
    id, firstname, lastname, age, haircolor, countryName, gender, lookingFor, image
  };
  console.log(newUser);

  // post new user to php userService using fetch(...)
  const response = await fetch(_baseUrl + "?action=createUser", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(newUser) // parsing js object to json object
  });
  // waiting for the result
  const result = await response.json();
  console.log(result); // the result is the new updated users array
  appendUsers(result); // update the DOM using appendUsers(...)
  _users = result;
  navigateTo("#/"); // navigating back to front page
}

// ========== Update ==========

function showUserUpdate() {
  const userToUpdate = _users.find(user => user.id == _selectedUserId);
  console.log(userToUpdate);

  document.querySelector("#firstnameUpdate").value = userToUpdate.firstname;
  document.querySelector("#lastnameUpdate").value = userToUpdate.lastname;
  document.querySelector("#ageUpdate").value = userToUpdate.age;
  document.querySelector("#haircolorUpdate").value = userToUpdate.haircolor;
  document.querySelector("#countryUpdate").value = userToUpdate.countryName;
  document.querySelector("#genderUpdate").value = userToUpdate.gender;
  document.querySelector("#lookingForUpdate").value = userToUpdate.lookingFor;

  navigateTo("#/update");
}

async function updateUserEvent() {
  const firstname = document.querySelector("#firstnameUpdate").value;
  const lastname = document.querySelector("#lastnameUpdate").value;
  const age = document.querySelector("#ageUpdate").value;
  const haircolor = document.querySelector("#haircolorUpdate").value;
  const countryName = document.querySelector("#countryUpdate").value;
  const gender = document.querySelector("#genderUpdate").value;
  const lookingFor = document.querySelector("#lookingForUpdate").value;
  const imageFile = document.querySelector("#fileToUploadUpdate").files[0];

  if (firstname && lastname && age && haircolor && countryName && gender && lookingFor && imageFile) {
    const imageResult = await uploadImage(imageFile);
    if (imageResult.status === "success") {
      updateUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor, imageResult.data.fileName);
    }
  } else {
    alert(" Please fill in all fields.");
  }
}

async function updateUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor, image) {
  const userToUpdate = { // declaring a new js object with the form values
    id: _selectedUserId, firstname, lastname, age, haircolor, countryName, gender, lookingFor, image
  };
  console.log(userToUpdate);

  // put user to php userService using fetch(...)
  const response = await fetch(_baseUrl + "?action=updateUser", {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(userToUpdate) // parsing js object to json object
  });
  // waiting for the result
  const result = await response.json();
  console.log(result); // the result is the new updated users array
  _users = result;
  appendUsers(result); // update the DOM using appendUsers(...)
  navigateTo("#/"); // navigating back to front page

}

// ========== Delete ==========
async function deleteUser() {
  const deleteUser = confirm("Do you want to delete user?");
  if (deleteUser && _selectedUserId) {
    // delete user using php userService and fetch(...)
    const response = await fetch(`${_baseUrl}?action=deleteUser&userid=${_selectedUserId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
    // waiting for the result
    const result = await response.json();
    console.log(result); // the result is the new updated users array
    _users = result;
    appendUsers(result); // update the DOM using appendUsers(...)
    navigateTo("#/"); // navigating back to front page
  }
}
// ========== Loader ==========
/**
 * Shows or hides loader by giden parameter: true/false
 */
function showLoader(show) {
  const loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

// ========== INIT APP ==========
async function init() {
  await loadUsers();
  _selectedUserId = localStorage.getItem("selectedUserId");
  if (_selectedUserId && location.hash === "#/user") {
    showUser(_selectedUserId);
  }
}

init();