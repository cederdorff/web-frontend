import loader from "../components/loader.js";
import router from "../router.js";
import services from "../services.js";

export default class UsersPage {
	constructor(id) {
		this.id = id;
		this.render();
		this.initUsers();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <h2>Users</h2>
                </header>
                <section id="grid-users" class="grid-container"></section>
            </section>
        `
		);
	}

	appendUsers(users) {
		let htmlTemplate = "";
		for (const user of users) {
			htmlTemplate += /*html*/ `
                <article data-user-id="${user.id}">
                    <img src="backend/files/medium/${user.image || "placeholder.jpg"}">
                    <h3>${user.name}</h3>
                    <p>Age: ${user.age}, Gender: ${user.gender}, Looking for: ${user.lookingFor}</p>
                </article>
            `;
		}
		document.querySelector("#grid-users").innerHTML = htmlTemplate;
		this.attachEvents();
	}

	async initUsers() {
		loader.show();
		const users = await services.getUsers();
		this.appendUsers(users);
		loader.hide();
	}

	attachEvents() {
		document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
			element.onclick = () => {
				const userId = element.getAttribute("data-user-id");
				router.navigateTo(`#/user/${userId}`, { userId: userId });
			};
		});
	}

	beforeShow(params) {
		if (params.users) {
			this.appendUsers(params.users);
		}
	}
}
