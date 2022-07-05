class Person {
    constructor(name, mail, birthdate, img) {
        this.name = name;
        this.mail = mail;
        this.birthdate = birthdate; // format: yyyy-mm-dd
        this.img = img;
    }

    log() {
        console.log(`
      Name: ${this.name}, 
      Mail: ${this.mail}, 
      Birthdate: ${this.birthdate}, 
      Image Url: ${this.img}
    `);
    }

    getAge() {
        const birthDate = new Date(this.birthdate);
        const today = new Date();
        const diff = new Date(today - birthDate);
        return diff.getFullYear() - 1970;
    }

    getHtmlTemplate() {
        const template = /*html*/ `
          <article>
            <img src="${this.img}" alt="${this.name}">
            <h2>${this.name}</h2>
            <a href="mailto:${this.mail}">${this.mail}</a>
            <p>Birthdate: ${this.birthdate}</p>
            <p>Age: ${this.getAge()} years old</p>
          </article>
      `;

        return template;
    }
}

const persons = [
    new Person(
        "Birgitte Kirk Iversen",
        "bki@eaaa.dk",
        "1966-01-14",
        "https://www.eaaa.dk/media/u4gorzsd/birgitte-kirk-iversen2.jpg?width=800&height=450"
    ),
    new Person(
        "Martin Aagaard Nøhr",
        "mnor@eaaa.dk",
        "1989-05-02",
        "https://www.eaaa.dk/media/oayjq02h/martin-n%C3%B8hr.jpg?width=800&height=450"
    ),
    new Person(
        "Rasmus Cederdorff",
        "race@eaaa.dk",
        "1990-09-15",
        "https://www.eaaa.dk/media/devlvvgj/rasmus-cederdorff.jpg?width=800&height=450"
    )
];

console.log(persons);

for (const person of persons) {
    document.querySelector("#content").innerHTML += person.getHtmlTemplate();
}
