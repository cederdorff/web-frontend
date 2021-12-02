import { navigateTo } from "./router.js";
console.log("app.js is running!");

// window.login = () => {
//     const mail = document.querySelector("#login-mail").value;
//     const password = document.querySelector("#login-password").value;

//     if (mail === "race@eaaa.dk" && password === "test01") {
//         localStorage.setItem("userIsAuthenticated", true);
//         document.querySelector(".login-message").innerHTML = "";
//         navigateTo("#/");
//     } else {
//         document.querySelector(".login-message").innerHTML = "User not found. Wrong mail og password.";
//     }
// }

async function login() {
	const username = document.querySelector("#login-username").value;
	const password = document.querySelector("#login-password").value;
	const loginObject = { username: username, password: password };
	console.log(loginObject);
	const response = await fetch("http://localhost:3000/php-login-service/?action=login", {
		method: "POST",
		body: JSON.stringify(loginObject)
	});

	const data = await response.json();
	console.log(data);
	if (data.authenticated) {
		localStorage.setItem("userIsAuthenticated", true);
		localStorage.setItem("authUser", JSON.stringify(data.userData));
		resetMessage();
		navigateTo("#/");
	} else {
		document.querySelector(".login-message").innerHTML = data.error;
	}
}

function logout() {
	//reset localStorage
	localStorage.removeItem("userIsAuthenticated");
	localStorage.removeItem("authUser");
	//navigate to login
	navigateTo("#/login");
}

async function signup() {
	const firstname = document.querySelector("#signup-firstname").value;
	const lastname = document.querySelector("#signup-lastname").value;
	const age = document.querySelector("#signup-age").value;
	const gender = document.querySelector("#signup-gender").value;
	const username = document.querySelector("#signup-username").value;
	const password = document.querySelector("#signup-password").value;
	const passwordCheck = document.querySelector("#signup-password-check").value;

	const user = { firstname, lastname, age, gender, username, password, passwordCheck };
	console.log(user);

	const response = await fetch("http://localhost:3000/php-login-service/?action=signup", {
		method: "POST",
		body: JSON.stringify(user)
	});

	const data = await response.json();
	console.log(data);
	if (data.signupSuccess) {
		resetMessage();
		navigateTo("#/login");
	} else {
		document.querySelector(".signup-message").innerHTML = data.error;
	}
}

function resetMessage() {
	document.querySelector(".signup-message").innerHTML = "";
	document.querySelector(".login-message").innerHTML = "";
}

// event listeners
document.querySelector("#btn-login").onclick = () => login();
document.querySelector("#btn-logout").onclick = () => logout();
document.querySelector("#btn-signup").onclick = () => signup();
