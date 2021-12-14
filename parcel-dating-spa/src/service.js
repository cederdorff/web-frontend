class Service {
	constructor() {
		this.users = [];
		this.baseUrl = "https://web-frontend.cederdorff.com/user-service/";
		this.selectedUserId;
	}

	/**
	 * fetch and return all users from backend service
	 */
	async getUsers() {
		const url = `${this.baseUrl}?action=getUsers`;
		const response = await fetch(url);
		const data = await response.json();
		this.users = data;
		return this.users;
	}

	/**
	 * fetch and return all matches based
	 */
	async getMatches(userId) {
		const url = `${this.baseUrl}?action=getMatches&userId=${userId}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	async getUser(userId) {
		const url = `${this.baseUrl}?action=getUser&userId=${userId}`;
		const response = await fetch(url);
		const user = await response.json();
		return user;
	}

	async uploadImage(imageFile) {
		let formData = new FormData();
		formData.append("fileToUpload", imageFile);

		const response = await fetch(`${this.baseUrl}?action=uploadImage`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: formData
		});
		// waiting for the result
		const result = await response.json();
		return result;
	}

	async deleteUser(userId) {
		const response = await fetch(`${this.baseUrl}?action=deleteUser&userId=${userId}`, {
			method: "DELETE"
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
			id: id,
			name:name,
			age: age,
			gender: gender,
			lookingFor: lookingFor,
			image: image
		};

		// post new user to php userService using fetch(...)
		const response = await fetch(this.baseUrl + "?action=createUser", {
			method: "POST",
			body: JSON.stringify(newUser) // parsing js object to json object
		});
		// waiting for the result
		const result = await response.json();
		// the result is the new updated users array
		this.users = result;
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
			image
		};
		// put user to php userService using fetch(...)
		const response = await fetch(this.baseUrl + "?action=updateUser", {
			method: "PUT",
			body: JSON.stringify(userToUpdate) // parsing js object to json object
		});
		// waiting for the result
		const result = await response.json();
		// the result is the new updated users array
		this.users = result;
		return this.users;
	}
}

const service = new Service();
export default service;
