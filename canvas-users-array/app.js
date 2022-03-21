// Vanilla JS ❤️ 🧡 💛 💚 💙 💜
let users = [
    {
        id: "21628",
        avatar_url: "https://eaaa.instructure.com/images/thumbnails/781064/vW89KBSTW4XGZu4TRDsCggqiVXVDFanSBEyqQRSr",
        created_at: "2020-01-18T02:53:30+01:00",
        email: "eaadimy@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        login_id: "eaadimy@students.eaaa.dk",
        name: "Diana Riis Myjak Andersen",
        short_name: "Diana Riis Myjak Andersen (EAADIMY)",
        sortable_name: "Andersen, Diana Riis Myjak"
    },
    {
        id: "34273",
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaagar@students.eaaa.dk",
        created_at: "2022-01-15T00:49:18+01:00",
        email: "eaagar@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        login_id: "eaagar@students.eaaa.dk",
        name: "German Arias Rodriguez",
        short_name: "German Arias Rodriguez (EAAGAR)",
        sortable_name: "Arias Rodriguez, German"
    },
    {
        id: "33983",
        avatar_url: "https://eaaa.instructure.com/images/thumbnails/794858/5VQ6bbEBm1nsRBBBfxWKUsIMg3b7ARek9rNkDDeh",
        created_at: "2021-12-23T00:47:30+01:00",
        email: "eaahbar@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        login_id: "eaahbar@students.eaaa.dk",
        name: "Haya Barakat",
        short_name: "Haya Barakat (EAAHBAR)",
        sortable_name: "Barakat, Haya"
    },
    {
        id: "33989",
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaadabi@students.eaaa.dk",
        created_at: "2021-12-23T00:47:42+01:00",
        email: "eaadabi@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        login_id: "eaadabi@students.eaaa.dk",
        name: "Daniel Birkus",
        short_name: "Daniel Birkus (EAADABI)",
        sortable_name: "Birkus, Daniel"
    },
    {
        id: "14427",
        avatar_url: "https://eaaa.instructure.com/images/thumbnails/760199/Ugh7nX072ONnxJ26tfMmAkFxwfRLBywUBHNy25mK",
        created_at: "2018-09-06T02:23:57+02:00",
        email: "race@eaaa.dk",
        enrollment_type: "TeacherEnrollment",
        login_id: "race@eaaa.dk",
        name: "Rasmus Cederdorff",
        short_name: "Rasmus Cederdorff (lektor – race@eaaa.dk)",
        sortable_name: "Cederdorff, Rasmus"
    },
    {
        id: "33982",
        avatar_url: "https://data.efif.dk/Image/StudSys.ashx?cmd=EAA&key=ccd6629f-904f-4356-b4c3-44d5d52cdc08&Username=eaanac@students.eaaa.dk",
        created_at: "2021-12-23T00:47:27+01:00",
        email: "eaanac@students.eaaa.dk",
        enrollment_type: "StudentEnrollment",
        login_id: "eaanac@students.eaaa.dk",
        name: "Nicklas Andié Christensen",
        short_name: "Nicklas Andié Christensen (EAANAC)",
        sortable_name: "Christensen, Nicklas Andié"
    }
];

function appendUsers(users) {
    let htmlTemplate = "";
    for (const user of users) {
        console.log(user);
        htmlTemplate += /*html*/ `
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
