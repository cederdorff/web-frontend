import service from "../service.js";
import router from "../router.js";
import loader from "../components/loader.js";

export default class UpdatePage {
	constructor(id) {
		this.id = id;
		this.render();
		this.selectedUser;

		this.nameInput = document.querySelector(`#${this.id} [name="name"]`);
		this.ageInput = document.querySelector(`#${this.id} [name="age"]`);
		this.genderInput = document.querySelector(`#${this.id} [name="gender"]`);
		this.lookingForInput = document.querySelector(`#${this.id} [name="lookingFor"]`);
		this.imagePreview = document.querySelector(`#${this.id} [name="imagePreview"]`);
		this.imageInput = document.querySelector(`#${this.id} [name="profileImage"]`);

		this.attachEvents();
	}

	/**
	 * renders the initial HTML template of the page.
	 * It is using insertAdjacentHTML, which is another way of adding text as HTML to the DOM (read more here: https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp).
	 */
	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a class="left cancel">Cancel</a>
                    <h2>Update User</h2>
                </header>
                <section>
                    <form>
                        <input type="text" name="name" placeholder="Name">
                        <input type="number" name="age" placeholder="Age">
                        <select name="gender">
                            <option value="" selected disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Binary">Binary</option>
                        </select>
                        <select name="lookingFor">
                            <option value="" selected disabled>Select looking for</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Binary">Binary</option>
                        </select>
                        <img name="imagePreview" class="image-preview">
                        <input type="file" name="profileImage" accept="image/*"
                        onchange="previewImage(this.files[0], 'imagePreviewUpdate')">
                        <button type="button" class="save">Save</button>
                    </form>
                </section>
            </section>

        `
		);
	}

	/**
	 * attaching events to DOM elements.
	 */
	attachEvents() {
		document.querySelector(`#${this.id} .cancel`).onclick = () => router.goBack();
		document.querySelector(`#${this.id} .save`).onclick = () => this.save();
		this.imageInput.onchange = () => this.previewImage();
	}

	previewImage() {
		const file = this.imageInput.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = event => {
				this.imagePreview.setAttribute("src", event.target.result);
			};
			reader.readAsDataURL(file);
		}
	}

	//called by the save button - saves the user info
	async save() {
		// validate input fields before save
		if (this.validate()) {
			loader.show();
			if (this.imageInput.files[0]) {
				//also check image file and upload if new file
				const image = await service.uploadImage(this.imageInput.files[0]);
				this.selectedUser.image = image.name;
			}
			//update user through the service
			const users = await service.updateUser(
				this.selectedUser.id,
				this.nameInput.value,
				this.ageInput.value,
				this.genderInput.value,
				this.lookingForInput.value,
				this.selectedUser.image
			);
			//navigate to user profile page
			router.navigateTo(`/user/${this.selectedUser.id}`);
			loader.hide();
		}
	}

	/**
	 * if name, age, gender and looking return true
	 * else display alert and return false
	 */
	validate() {
		if (
			this.nameInput.value &&
			this.ageInput.value &&
			this.genderInput.value &&
			this.lookingForInput.value
		) {
			return true;
		} else {
			alert("Please, fill in all fields.");
			return false;
		}
	}

	/**
	 * beforeShow is called by the router every time the page is going to be displayed.
	 * beforeShow is called right before the pages is shown and you can call methods you
	 * like to be executed every time the page is shown.
	 * in the case i'm getting the user id from the passed props
	 * the user id is used to get user info, service.getUser(props.id).
	 * by that i'm able to set the field values with the properties of the "user to update".
	 */

	async beforeShow(props) {
		loader.show();
		const user = await service.getUser(props.id);
		this.selectedUser = user;

		this.nameInput.value = this.selectedUser.name;
		this.ageInput.value = this.selectedUser.age;
		this.genderInput.value = this.selectedUser.gender;
		this.lookingForInput.value = this.selectedUser.lookingFor;
		this.imagePreview.src = `${service.baseUrl}/files/medium/${
			this.selectedUser.image || "placeholder.jpg"
		}`;
		this.imageInput.value = ""; // reset value
		loader.hide();
	}
}
