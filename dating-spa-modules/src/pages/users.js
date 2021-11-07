import router from "../router.js";
import services from "../services.js";

class UsersPage {
    constructor() {
        this.id = "users";
        this.render();
        this.appendUsers();
    }

    render() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", /*html*/`
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <h2>Users</h2>
                </header>
                <section id="grid-users" class="grid-container"></section>
            </section>
        `);
    }

    async appendUsers() {
        const users = await services.getUsers();
        let htmlTemplate = "";
        for (const user of users) {
            htmlTemplate += /*html*/ `
                <article data-user-id="${user.id}">
                    <img src="backend/small/${user.image || "placeholder.jpg"}">
                    <h3>${user.firstname} ${user.lastname}</h3>
                    <p>Age: ${user.age}, Gender: ${user.gender}, Looking for: ${user.lookingFor}</p>
                </article>
            `;
        }
        document.querySelector("#grid-users").innerHTML = htmlTemplate;
        this.attachEvents();
    }

    attachEvents() {
        document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
            element.onclick = () => {
                const userId = element.getAttribute("data-user-id");
                router.navigateTo(`#/user/${userId}`, { userId: userId });
            }
        })
    }

    beforeShow(params) {
        //
    }
}

const usersPage = new UsersPage();
export default usersPage;