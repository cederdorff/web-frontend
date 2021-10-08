// ========== GLOBAL VARIABLES ==========
let _users = [];
const _baseUrl = "http://localhost:3000/users-match-backend/userService.php";

// ========== READ ==========

/**
 * Fetchs person data from jsonbin
 */
async function loadUsers() {
  const url = _baseUrl + "?action=getUsers";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  _users = data;
  appendUsers(_users);
}
loadUsers();

/**
 * Appends users to the DOM
 * @param {Array} users 
 */
function appendUsers(users) {
  let htmlTemplate = "";
  for (const user of users) {
    htmlTemplate += /*html*/ `
      <article onclick="showMatches(${user.id})">
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}</p>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

async function getMatches(userId) {
  const url = `${_baseUrl}?action=getMatches&userid=${userId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function showMatches(userId) {
  const matchData = await getMatches(userId);
  console.log(matchData);
  appendMatches(matchData);
  navigateTo("#/matches");
}

function appendMatches(data) {
  let htmlTemplate = /*html*/ `
    <article class="selectedUser">
        <h3>${data.selectedUser.firstname} ${data.selectedUser.lastname}</h3>
        <p>Age: ${data.selectedUser.age}, Gender: ${data.selectedUser.gender}</p>
        <p>Number of matches: ${data.matchCount}</p>
    </article>
  `;
  for (const user of data.matches) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.firstname} ${user.lastname}</h3>
        <p>Age: ${user.age}, Gender: ${user.gender}</p>
      </article>
      `;
  }
  document.querySelector("#grid-matches").innerHTML = htmlTemplate;
  showLoader(false);
}

// ========== CREATE ==========
async function saveUser(firstname, lastname, age, haircolor, country, gender) {
  const id = Date.now() + ""; // dummy generated user id
  const newUser = {
    id, firstname, lastname, age, haircolor, country, gender
  };
  console.log(newUser);

  // put users array to php service
  const response = await fetch(_baseUrl + "?action=createUser", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(newUser)
  });
  // waiting for the result
  const result = await response.json(); // the new updated users array from jsonbin
  console.log(result);

}




// ========== Loader ==========
/**
 * Shows or hides loader by giden parameter: true/false
 * @param {boolean} show 
 */
function showLoader(show) {
  const loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}