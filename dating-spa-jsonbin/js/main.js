// ========== Global Variables ==========
let _users = [];
let _selectedUserId;
const _baseUrl = "https://api.jsonbin.io/v3/b/6183bd069548541c29cd8475";
const _headers = {
  "X-Master-Key": "$2b$10$Uf1lbMtIPrrWeneN3Wz6JuDcyBuOz.1LbHiUg32QexCCJz3nOpoS2",
  "Content-Type": "application/json"
};

// ===================================================
// ========== Services and Helper Functions ==========

/**
 * Fetches user data from php backend services 
 */
async function loadUsers() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, {
    headers: _headers
  });
  const data = await response.json();
  console.log(data);
  _users = data.record;
  appendUsers(_users);
}


/**
 * Updates the data source on jsonbin with a given users arrays
 * @param {Array} users 
 */
async function updateJSONBIN(users) {
  // put users array to jsonbin
  const response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(users)
  });
  // waiting for the result
  const result = await response.json(); // the new updated users array from jsonbin
  console.log(result);
  //updating the DOM with the new fetched users
  appendUsers(result.record);
}

/**
 * returns matches based on given userId
 */
function getMatches() {
  const matches = [];
  const selectedUser = _users.find(user => user.id == _selectedUserId);
  const ageRange = 4;

  for (const user of _users) {
    const minAge = user.age - ageRange;
    const maxAge = user.age + ageRange;
    if (selectedUser.age >= minAge && selectedUser.age <= maxAge && selectedUser.lookingFor == user.gender && user.lookingFor == selectedUser.gender && user.id != selectedUser.id) {
      matches.push(user);
    }
  }

  const data = {
    selectedUser: selectedUser,
    matches: matches,
    matchCount: matches.length
  };
  return data;
}

async function deleteUser() {
  const deleteUser = confirm("Do you want to delete user?");
  if (deleteUser && _selectedUserId) {
    // delete user using php userService and fetch(...)
    _users = _users.filter(user => user.id != _selectedUserId);
    await updateJSONBIN(_users); // the result is the new updated users array
    navigateTo("#/"); // navigating back to front page
  }
}

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

// ============================
// ========== Events ==========

async function showUserEvent(userId) {
  _selectedUserId = userId;
  localStorage.setItem("selectedUserId", _selectedUserId);
  showUserPage();
}

async function showUserPage() {
  const matchData = getMatches();
  console.log(matchData);
  appendMatches(matchData);
  navigateTo("#/user");
}

// =============================================
// ========== Users Page (front page) ==========

/**
 * Appends users to the DOM
 */
function appendUsers(users) {
  let htmlTemplate = "";
  for (const user of users) {
    htmlTemplate += /*html*/ `
      <article onclick="showUserEvent(${user.id})">
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}, Looking for: ${user.lookingFor}</p>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}


// =======================================
// ========== User Profile Page ==========

function appendMatches(data) {
  let htmlTemplate = /*html*/ `
    <article class="selectedUser">
        <h3>${data.selectedUser.firstname} ${data.selectedUser.lastname}</h3>
        <p>Age: ${data.selectedUser.age}, Gender: ${data.selectedUser.gender}</p>
        <p>Number of matches: ${data.matchCount}</p>
        <button type="button" class="update" onclick="showUserUpdate(${data.selectedUser.id})">Update</button>
        <button type="button" class="delete" onclick="deleteUser(${data.selectedUser.id})">Delete</button>
    </article>
  `;

  for (const user of data.matches) {
    htmlTemplate += /*html*/ `
      <article onclick="showUserEvent(${user.id})">
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}</p>
      </article>
      `;
  }
  document.querySelector("#grid-matches").innerHTML = htmlTemplate;
  document.querySelector("#user .title").innerHTML = data.selectedUser.firstname;
  showLoader(false);
}

// ======================================
// ========== Create User Page ==========

async function createUserEvent() {
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const age = document.querySelector("#age").value;
  const haircolor = document.querySelector("#haircolor").value;
  const countryName = document.querySelector("#country").value;
  const gender = document.querySelector("#gender").value;
  const lookingFor = document.querySelector("#lookingFor").value;

  if (firstname && lastname && age && haircolor && countryName && gender && lookingFor) {
    createUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor);
  } else {
    alert(" Please fill in all fields.");
  }
}

/**
 * creates a new user and saving in JSON file using the php backend service
 */
async function createUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor) {
  const id = Date.now(); // dummy generated user id
  const newUser = { // declaring a new js object with the form values
    id, firstname, lastname, age, haircolor, countryName, gender, lookingFor
  };
  console.log(newUser);
  // pushing the new user object to the _users array
  _users.push(newUser);
  // wait for update
  await updateJSONBIN(_users);
  navigateTo("#/"); // navigating back to front page
}

// ======================================
// ========== Update User Page ==========

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

  if (firstname && lastname && age && haircolor && countryName && gender && lookingFor) {
    updateUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor);
  } else {
    alert(" Please fill in all fields.");
  }
}

async function updateUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor) {
  const userToUpdate = _users.find(user => user.id == _selectedUserId);
  console.log(userToUpdate);
  userToUpdate.firstname = firstname;
  userToUpdate.lastname = lastname;
  userToUpdate.age = age;
  userToUpdate.haircolor = haircolor;
  userToUpdate.countryName = countryName;
  userToUpdate.gender = gender;
  userToUpdate.lookingFor = lookingFor;

  // wait for update
  await updateJSONBIN(_users);
  showUserPage(); // navigating back to user page
}

// ==============================
// ========== INIT APP ==========
async function init() {
  await loadUsers();
  _selectedUserId = localStorage.getItem("selectedUserId");
  if (_selectedUserId) {
    if (location.hash === "#/user") {
      showUserPage();
    }
    else if (location.hash === "#/update") {
      showUserUpdate();
    }
  }
}

init();