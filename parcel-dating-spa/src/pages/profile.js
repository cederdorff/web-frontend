import loader from "../components/loader.js";
import router from "../router.js";
import services from "../services.js";

export default class UserProfilePage {
	constructor(id) {
		this.id = id;
		this.selectedUser;
		this.matches;
		this.render();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a class="left back">Back</a>
                    <h2 class="title">User</h2>
                </header>
                <section class="matches grid-container"></section>
            </section>
        `
		);
	}

	appendUserData() {
		let htmlTemplate = /*html*/ `
            <article class="selectedUser">
            <img src="http://localhost:3000/user-service/files/medium/${
							this.selectedUser.image || "placeholder.jpg"
						}">
                <h3>${this.selectedUser.name}</h3>
                <p>Age: ${this.selectedUser.age}, Gender: ${this.selectedUser.gender}</p>
                <p>Number of matches: ${this.matches.length}</p>
                <button type="button" class="update">Update</button>
                <button type="button" class="delete">Delete</button>
            </article>
        `;

		for (const user of this.matches) {
			htmlTemplate += /*html*/ `
            <article data-user-id="${user.id}">
                <img src="http://localhost:3000/user-service/files/medium/${
									user.image || "placeholder.jpg"
								}">
                <h3>${user.name}</h3>
                <p>Age: ${user.age}, Gender: ${user.gender}</p>
            </article>
            `;
		}

		document.querySelector(`#${this.id} .matches`).innerHTML = htmlTemplate;
		document.querySelector(`#${this.id} .title`).innerHTML = this.selectedUser.name;

		this.attachEvents();
	}

	attachEvents() {
		document.querySelector(`#${this.id} .back`).onclick = () => router.goBack();

		document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
			element.onclick = () => {
				const userId = element.getAttribute("data-user-id");
				router.navigateTo(`/user/${userId}`, {
					userId: userId,
				});
			};
		});

		document.querySelector(`#${this.id} .update`).onclick = () =>
			router.navigateTo(`/update/${this.selectedUser.id}`);

		document.querySelector(`#${this.id} .delete`).onclick = () => this.showDeleteDialog();
	}

	async showDeleteDialog() {
		const deleteUser = confirm("Do you want to delete user?");

		if (deleteUser) {
			loader.show();
			const users = await services.deleteUser(this.selectedUser.id);
			router.navigateTo("/", {
				users: users,
			});
			loader.hide();
		}
	}

	async beforeShow(params) {
		loader.show();
		this.selectedUser = await services.getUser(params.id);
		this.matches = await services.getMatches(params.id);
		this.appendUserData();
		loader.hide();
	}
}
