class Services {
	constructor() {
		this.users = [];
		this.baseUrl = "http://localhost:3000/user-service/userService.php";
		this.selectedUserId;
	}

	async getUsers() {
		const url = `${this.baseUrl}?action=getUsers`;
		const response = await fetch(url);
		const data = await response.json();
		this.users = data;
		return this.users;
	}

	async getMatches(userId) {
		const url = `${this.baseUrl}?action=getMatches&userid=${userId}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	async getUser(userId) {
		console.log(userId, `${this.baseUrl}?action=getUser&userid=${userId}`);
		const url = `${this.baseUrl}?action=getUser&userid=${userId}`;
		const response = await fetch(url);
		const user = await response.json();
		console.log(user);
		return user;
	}

	async uploadImage(imageFile) {
		let formData = new FormData();
		formData.append("fileToUpload", imageFile);

		const response = await fetch(`${this.baseUrl}?action=uploadImage`, {
			method: "POST",
			headers: {
				"Access-Control-Allow-Headers": "Content-Type",
			},
			body: formData,
		});
		// waiting for the result
		const result = await response.json();
		return result;
	}

	async deleteUser(userId) {
		const response = await fetch(`${this.baseUrl}?action=deleteUser&userid=${userId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json; charset=utf-8" },
		});
		// waiting for the result
		const result = await response.json();
		// the result is the new updated users array
		this.users = result;
		return this.users;
	}

	async createUser(name, age, gender, lookingFor, image) {
		const id = Date.now(); // dummy generated user id
		const newUser = {
			// declaring a new js object with the form values
			id,
			name,
			age,
			gender,
			lookingFor,
			image,
		};
		console.log(newUser);

		// post new user to php userService using fetch(...)
		const response = await fetch(this.baseUrl + "?action=createUser", {
			method: "POST",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify(newUser), // parsing js object to json object
		});
		// waiting for the result
		const result = await response.json();
		// the result is the new updated users array
		this.users = result;
		console.log(result);
		return this.users;
	}

	async updateUser(id, name, age, gender, lookingFor, image) {
		const userToUpdate = {
			// declaring a new js object with the form values
			id,
			name,
			age,
			gender,
			lookingFor,
			image,
		};
		// put user to php userService using fetch(...)
		const response = await fetch(this.baseUrl + "?action=updateUser", {
			method: "PUT",
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify(userToUpdate), // parsing js object to json object
		});
		// waiting for the result
		const result = await response.json();
		// the result is the new updated users array
		this.users = result;
		return this.users;
	}
}

const services = new Services();
export default services;
