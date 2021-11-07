class Services {
    constructor() {
        this.users = [];
        this.baseUrl = "backend/userService.php";
        this.selectedUserId;
    }

    async getUsers() {
        const url = `${this.baseUrl}?action=getUsers`;
        const response = await fetch(url);
        const data = await response.json();
        this.users = data;
        return this.users;
    }

    async getUserData(userId) {
        const url = `${this.baseUrl}?action=getMatches&userid=${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async uploadImage(imageFile) {
        let formData = new FormData();
        formData.append("fileToUpload", imageFile);

        const response = await fetch("backend/upload.php", {
            method: "POST",
            headers: { "Access-Control-Allow-Headers": "Content-Type" },
            body: formData
        });
        // waiting for the result
        const result = await response.json();
        console.log(result);
        return result;
    }

    async deleteUser(userId) {
        const response = await fetch(`${this.baseUrl}?action=deleteUser&userid=${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json; charset=utf-8" }
        });
        // waiting for the result
        const result = await response.json();
        console.log(result); // the result is the new updated users array
        this.users = result;
        return this.users;
    }

    async createUser(firstname, lastname, age, haircolor, countryName, gender, lookingFor, image) {
        const id = Date.now(); // dummy generated user id
        const newUser = { // declaring a new js object with the form values
            id, firstname, lastname, age, haircolor, countryName, gender, lookingFor, image
        };
        console.log(newUser);

        // post new user to php userService using fetch(...)
        const response = await fetch(_baseUrl + "?action=createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(newUser) // parsing js object to json object
        });
        // waiting for the result
        const result = await response.json();
        console.log(result); // the result is the new updated users array
        this.users = result;
        return this.users;
    }

    async updateUser({ firstname, lastname, age, haircolor, countryName, gender, lookingFor, image }) {
        const userToUpdate = { // declaring a new js object with the form values
            id: _selectedUserId, firstname, lastname, age, haircolor, countryName, gender, lookingFor, image
        };
        // put user to php userService using fetch(...)
        const response = await fetch(_baseUrl + "?action=updateUser", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(userToUpdate) // parsing js object to json object
        });
        // waiting for the result
        const result = await response.json();
        console.log(result); // the result is the new updated users array
        this.users = result;
        return this.users;
    }
}

const services = new Services();
export default services;