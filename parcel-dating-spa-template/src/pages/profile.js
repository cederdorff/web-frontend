export default class UserProfilePage {
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
                    <a class="left back">Back</a>
                    <h2 class="title">User</h2>
                </header>
                <section class="matches grid-container"></section>
            </section>
        `
		);
	}

	beforeShow(props) {
		console.log(props);
	}
}
