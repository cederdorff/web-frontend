import loader from "../components/loader.js";
import router from "../router.js";
import service from "../service.js";

export default class UserProfilePage {
	constructor(id) {
		this.id = id;
		this.selectedUser;
		this.matches;
		this.render();
	}

	/**
	 * renders the initial HTML template of the page.
	 * It is using insertAdjacentHTML, which is another way of adding text as HTML to the DOM (read more here: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp).
	 */
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
            <img src="${service.baseUrl}/files/medium/${
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
                <img src="${service.baseUrl}/files/medium/${user.image || "placeholder.jpg"}">
                <h3>${user.name}</h3>
                <p>Age: ${user.age}, Gender: ${user.gender}</p>
            </article>
            `;
		}

		document.querySelector(`#${this.id} .matches`).innerHTML = htmlTemplate;
		document.querySelector(`#${this.id} .title`).innerHTML = this.selectedUser.name;

		this.attachEvents();
	}

	/**
	 * attaching events to DOM elements.
	 */
	attachEvents() {
		document.querySelector(`#${this.id} .back`).onclick = () => router.navigateTo("/"); // on click add to back button

		document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
			// adds .onclick for every user calling router.navigateTo(...) with the id of the user.
			element.onclick = () => {
				const userId = element.getAttribute("data-user-id");
				router.navigateTo(`/user/${userId}`);
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
			const users = await service.deleteUser(this.selectedUser.id);
			router.navigateTo("/", {
				users: users
			});
			loader.hide();
		}
	}

	/**
	 * beforeShow is called by the router every time the page is going to be displayed.
	 * beforeShow is called right before the pages is shown and you can call methods you
	 * like to be executed every time the page is shown.
	 * in the case i'm getting the user id from the passed props
	 * the user id is used to get user info, service.getUser(props.id), and
	 * matches, service.getMatches(props.id), from the imported service
	 */
	async beforeShow(props) {
		loader.show();
		this.selectedUser = await service.getUser(props.id);
		this.matches = await service.getMatches(props.id);
		this.appendUserData();
		loader.hide();
	}
}
