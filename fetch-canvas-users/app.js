let users = [];

async function getUsers() {
    const data = await fetch("../data/wu-e22a.json").then(res => res.json());
    return data;
}

function appendUsers(userList) {
    let html = "";

    for (const user of userList) {
        console.log(user);

        html += /*html*/ `
             <article>
                <img src="${user.avatar_url}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.email}">${user.email}</a>
                <p>Role: ${user.enrollment_type}</p>
            </article>
        `;
    }

    document.querySelector("#users-grid").innerHTML = html;
}

async function initApp() {
    users = await getUsers();
    appendUsers(users);
}

initApp();
