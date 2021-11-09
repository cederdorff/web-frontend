export default class Nav {
	constructor() {
		this.render();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <nav class="tabbar">
                <a href="#/" class="router-link">Users</a>
                <a href="#/create" class="router-link">Create</a>
            </nav>
        `
		);
	}
}
