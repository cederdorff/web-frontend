// Vanilla JS ❤️ 🧡 💛 💚 💙 💜 

async function getUsers() {
    const response = await fetch("https://cederdorff.github.io/web-frontend/canvas-users/data.json");
    const data = await response.json();
    return data;
}

function appendUsers(users) {
    let htmlTemplate = "";
    for (const user of users) {
        console.log(user);
        htmlTemplate += /*html*/`
            <article>
                <img src="${user.avatar_url}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.email}">${user.email}</a>
                <p>Role: ${user.enrollments[0].type}</p>
            </article>
        `;
    }
    document.querySelector("#users").innerHTML = htmlTemplate;
}

async function initApp() {
    const users = await getUsers();
    appendUsers(users);
}

initApp();