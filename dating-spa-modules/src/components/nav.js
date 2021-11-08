class Nav {
	constructor() {
		document.querySelector("#root").insertAdjacentHTML("beforeend", this.render());
	}

	render() {
		return /*html*/ `
            <nav class="tabbar">
                <a href="#/" class="router-link">Users</a>
                <a href="#/create" class="router-link">Create</a>
            </nav>
        `;
	}
}

const nav = new Nav();
export default nav;
