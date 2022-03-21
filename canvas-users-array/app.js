// Vanilla JS ❤️ 🧡 💛 💚 💙 💜 
let users = [
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaalaak@students.eaaa.dk",
        created_at: "2019-08-03T02:26:25+02:00",
        email: "Lasse_aakjaer@hotmail.com",
        enrollment_type: "StudentEnrollment",
        id: "17636",
        login_id: "eaalaak@students.eaaa.dk",
        name: "Lasse Aakjær",
        short_name: "Lasse Aakjær (EAALAAK)",
        sortable_name: "Aakjær, Lasse"
    },
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaanean@students.eaaa.dk",
        created_at: "2019-08-07T02:26:39+02:00",
        email: "eaanean@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        id: "17929",
        login_id: "eaanean@students.eaaa.dk",
        name: "Nicklas Eibye Andersen",
        short_name: "Nicklas Eibye Andersen (EAANEAN)",
        sortable_name: "Andersen, Nicklas Eibye"
    },
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaapipo@students.eaaa.dk",
        created_at: "2019-08-02T02:26:42+02:00",
        email: "eaapipo@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        id: "17476",
        login_id: "eaapipo@students.eaaa.dk",
        name: "Piotr Andrzej Pospiech",
        short_name: "Piotr Andrzej Pospiech (EAAPIPO)",
        sortable_name: "Andrzej Pospiech, Piotr"
    },
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaathb@students.eaaa.dk",
        created_at: "2021-08-05T00:57:51+02:00",
        email: "eaathb@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        id: "30252",
        login_id: "eaathb@students.eaaa.dk",
        name: "Thomas Hyllegaard Busk",
        short_name: "Thomas Hyllegaard Busk (EAATHB)",
        sortable_name: "Busk, Thomas Hyllegaard"
    },
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaajnb@students.eaaa.dk",
        created_at: "2018-08-08T02:10:03+02:00",
        email: "eaajnb@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        id: "11879",
        login_id: "eaajnb@students.eaaa.dk",
        name: "Jesper Nissen Byg",
        short_name: "Jesper Nissen Byg (EAAJNB)",
        sortable_name: "Byg, Jesper Nissen"
    },
    {
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaababy@students.eaaa.dk",
        created_at: "2019-08-07T02:34:15+02:00",
        email: "eaababy@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        id: "17960",
        login_id: "eaababy@students.eaaa.dk",
        name: "Barbora Byrtusová",
        short_name: "Barbora Byrtusová (EAABABY)",
        sortable_name: "Byrtusová, Barbora"
    }];

function appendUsers(users) {
    let htmlTemplate = "";
    for (const user of users) {
        console.log(user);
        htmlTemplate += /*html*/`
            <article>
                <img src="${user.avatar_url}">
                <h2>${user.name}</h2>
                <a href="mailto:${user.email}">${user.email}</a>
                <p>Role: ${user.enrollment_type}</p>
            </article>
        `;
    }
    document.querySelector("#users").innerHTML = htmlTemplate;
}

function initApp() {
    appendUsers(users);
}

initApp();