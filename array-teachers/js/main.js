"use strict";

let teachers = [
    {
        name: "Birgitte Kirk Iversen",
        initials: "bki",
        mail: "bki@baaa.dk",
        phone: "72286316",
        address: "Sønderhøj 30, 8260 Viby J",
        position: "Senior Lecturer",
        department: "Multimedia Design",
        img: "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg?width=800&height=450"
    },
    {
        name: "Maria Louise Bendixen",
        initials: "mlbe",
        mail: "mlbe@baaa.dk",
        phone: "72286345",
        address: "Ringvej Syd 104, 8260 Viby J",
        position: "Senior Lecturer",
        department: "Multimedia Design",
        img: "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?width=800&height=450"
    },
    {
        name: "Kim Elkjær Marcher-Jepsen",
        initials: "kije",
        mail: "kije@baaa.dk",
        phone: "7228 6325",
        address: "Sønderhøj 30, 8260 Viby J",
        position: "Lecturer",
        department: "Multimedia Design",
        img: "https://www.baaa.dk/media/3zihz21l/kim-elkjaer-marcher-jepsen.jpg?width=800&height=450"
    },
    {
        name: "Rasmus Cederdorff",
        initials: "race",
        mail: "race@baaa.dk",
        phone: "72286318",
        address: "Sønderhøj 30, 8260 Viby J",
        position: "Lecturer",
        department: "Multimediedesigner & Professionsbachelor i digital konceptudvikling",
        img: "https://www.baaa.dk/media/devlvvgj/rasmus-cederdorff.jpg?width=800&height=450"
    }
];

console.log(teachers);
appendTeachers(teachers);

// Appending objects to the DOM
function appendTeachers(teachers) {
    for (let teacher of teachers) {
        document.querySelector("#grid-teachers").innerHTML += /*html*/ `
    <article>
      <img src="${teacher.img}">
      <h3>${teacher.name}</h3>
      ${teacher.position}<br>
      <a href="mailto:${teacher.mail}">${teacher.mail}</a>
    </article>`;
    }
}
