import router from "../router.js";
import services from "../services.js";

class UserPage {
    constructor() {
        this.id = "user";
        this.selectedUser;
        this.render();
    }

    render() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", /*html*/`
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a class="left back">Back</a>
                    <h2 class="title">User</h2>
                </header>
                <section id="grid-matches" class="grid-container"></section>
            </section>
        `);
    }

    async appendUserData(userId) {
        const data = await services.getUserData(userId);
        this.selectedUser = data;
        let htmlTemplate = /*html*/ `
            <article class="selectedUser">
            <img src="backend/small/${data.selectedUser.image || "placeholder.jpg"}">
                <h3>${data.selectedUser.firstname} ${data.selectedUser.lastname}</h3>
                <p>Age: ${data.selectedUser.age}, Gender: ${data.selectedUser.gender}</p>
                <p>Number of matches: ${data.matchCount}</p>
                <button type="button" class="update">Update</button>
                <button type="button" class="delete">Delete</button>
            </article>
        `;

        for (const user of data.matches) {
            htmlTemplate += /*html*/ `
            <article data-user-id="${user.id}">
                <img src="backend/small/${user.image || "placeholder.jpg"}">
                <h3>${user.firstname} ${user.lastname}</h3>
                <p>Age: ${user.age}, Gender: ${user.gender}</p>
            </article>
            `;
        }

        document.querySelector("#grid-matches").innerHTML = htmlTemplate;
        document.querySelector("#user .title").innerHTML = data.selectedUser.firstname;

        this.attachEvents();
    }

    attachEvents() {
        document.querySelector(`#${this.id} .back`).onclick = () => router.goBack();

        document.querySelectorAll(`#${this.id} [data-user-id]`).forEach(element => {
            element.onclick = () => {
                const userId = element.getAttribute("data-user-id");
                router.navigateTo(`#/user/${userId}`, { userId: userId });
            }
        });

        document.querySelector(`#${this.id} .update`).onclick = () => router.navigateTo(`#/update/${this.selectedUserId}`);

        document.querySelector(`#${this.id} .delete`).onclick = () => this.showDeleteDialog();
    }

    showDeleteDialog() {
        const deleteUser = confirm("Do you want to delete user?");
        if (deleteUser) {
            services.deleteUser(this.selectedUserId);
        }
    }

    beforeShow(params) {
        console.log(params);
        this.selectedUserId = params.id;
        this.appendUserData(this.selectedUserId);
    }
}

const userPage = new UserPage();
export default userPage;