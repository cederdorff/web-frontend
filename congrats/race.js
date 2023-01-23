class Race {
    says(toClass, congrats) {
        console.log(`
            Congratulations to ${toClass.name}, ${toClass.description} 
            ${congrats.message}
        `);
    }

    codeEveryDay() {
        console.log("Code Every Day!");
    }
}

const race = new Race();

export default race;
