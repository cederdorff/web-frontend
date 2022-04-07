let _posts = [];

async function getPosts() {
    const url = "https://raw.githubusercontent.com/cederdorff/web-frontend/main/data/posts.json";
    const response = await fetch(url);
    const data = await response.json();
    _posts = data;
}

function appendPosts(posts) {
    const mappedHtml = posts.map(post => /*html*/`
        <article>
            <img src=${post.image}>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </article>
    `).join("");
    document.querySelector("#content").innerHTML = mappedHtml
}

function search(value) {
    value = value.toLowerCase();
    const result = _posts.filter(post => post.title.toLowerCase().includes(value));
    appendPosts(result);
}

async function initApp() {
    await getPosts();
    appendPosts(_posts);
}

initApp();