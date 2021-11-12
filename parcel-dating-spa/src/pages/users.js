import loader from "../components/loader.js";
import router from "../router.js";
import service from "../service.js";

export default class UsersPage {
	constructor(id) {
		this.id = id;
		this.render();
		this.init();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <h2>Users</h2>
                </header>
                <section class="users-grid grid-container"></section>
            </section>
        `
		);
	}

	appendUsers(users) {
		let htmlTemplate = "";
		for (const user of users) {
			htmlTemplate += /*html*/ `
                <article data-user-id="${user.id}">
                    <img src="${service.baseUrl}/files/medium/${user.image || "placeholder.jpg"}">
                    <h3>${user.name}</h3>
                    <p>Age: ${user.age}, Gender: ${user.gender}, Looking for: ${user.lookingFor}</p>
                </article>
            `;
		}
		document.querySelector(`#${this.id} .users-grid`).innerHTML = htmlTemplate;
		this.attachEvents();
	}

	async init() {
		loader.show();
		const users = await service.getUsers();
		this.appendUsers(users);
		loader.hide();
	}

	attachEvents() {
		document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
			element.onclick = () => {
				const userId = element.getAttribute("data-user-id");
				router.navigateTo(`/user/${userId}`);
			};
		});
	}

	beforeShow(props) {
		if (props.users) {
			this.appendUsers(props.users);
		}
	}
}
