export default class UsersPage {
	constructor(id) {
		this.id = id;
		this.render();
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

	beforeShow(props) {
		console.log(props);
	}
}
