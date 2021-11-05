class Nav {
    constructor() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", this.render());
    }

    render() {
        return /*html*/`
             <nav class="tabbar">
                <a href="#/" class="nav-link">Users</a>
                <a href="#/create" class="nav-link">Create</a>
            </nav>
        `;
    }
}

const nav = new Nav();
export default nav;