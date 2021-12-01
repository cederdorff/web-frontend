import loader from "../components/loader.js";
import router from "../router.js";
import service from "../service.js";

export default class UsersPage {
	constructor(id) {
		this.id = id;
		this.render();
		this.init();
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
                    <h2>Users</h2>
                </header>
                <section class="users-grid grid-container"></section>
            </section>
        `
		);
	}

	/**
	 * uses the imported component loader to show and hide a loader.
	 * uses the imported services to get all users - getUsers().
	 * calls appendUsers with users returned from the service (service.getUsers()).
	 */
	async init() {
		loader.show();
		const users = await service.getUsers();
		this.appendUsers(users);
		loader.hide();
	}

	/**
	 * appends users to the .users-grid defined in render().
	 * It's using a template string to create HTML for every user.
	 * In the end, attachEvents() is executed in order to add events to every user (when you click on a user).
	 */
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

	/**
	 * attaching on click event to all users.
	 * using the querySelectorAll to grab all users appended in appendUsers.
	 * adds .onclick for every user calling router.navigateTo(...) with the id of the user.
	 */
	attachEvents() {
		document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
			element.onclick = () => {
				const userId = element.getAttribute("data-user-id");
				router.navigateTo(`/user/${userId}`);
			};
		});
	}

	/**
	 * beforeShow is called by the router every time the page is going to be displayed.
	 * beforeShow is called right before the pages is shown and you can call methods you
	 * like to be executed every time the page is shown.
	 * in the case i'm checking if there are a users array passed to the page through the props.
	 * if props.users then i call appendUsers(...).
	 */
	beforeShow(props) {
		if (props.users) {
			this.appendUsers(props.users);
		}
	}
}
