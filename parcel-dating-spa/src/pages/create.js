import loader from "../components/loader.js";
import router from "../router.js";
import services from "../services.js";

export default class CreatePage {
	constructor(id) {
		this.id = id;
		this.render();

		this.nameInput = document.querySelector(`#${this.id} [name="name"]`);
		this.ageInput = document.querySelector(`#${this.id} [name="age"]`);
		this.genderInput = document.querySelector(`#${this.id} [name="gender"]`);
		this.lookingForInput = document.querySelector(`#${this.id} [name="lookingFor"]`);
		this.imagePreview = document.querySelector(`#${this.id} [name="imagePreview"]`);
		this.imageInput = document.querySelector(`#${this.id} [name="profileImage"]`);

		this.attachEvents();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a href="#/" class="router-link left">Cancel</a>
                    <h2>Create new user</h2>
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
                        <input type="file" name="profileImage" accept="image/*">
                        <button type="button" class="save">Save</button>
                    </form>
                </section>
            </section>
        `
		);
	}

	attachEvents() {
		this.imageInput.onchange = () => this.previewImage();
		document.querySelector(`#${this.id} .save`).onclick = () => this.create();
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

	async create() {
		if (this.validate()) {
			loader.show();
			const image = await services.uploadImage(this.imageInput.files[0]);
			const users = await services.createUser(
				this.nameInput.value,
				this.ageInput.value,
				this.genderInput.value,
				this.lookingForInput.value,
				image.name
			);
			router.navigateTo("#/", { users: users });
			loader.hide();
		}
	}

	validate() {
		if (
			this.nameInput.value &&
			this.ageInput.value &&
			this.genderInput.value &&
			this.lookingForInput.value &&
			this.imageInput.files[0]
		) {
			return true;
		} else {
			alert("Please, fill in all fields.");
			return false;
		}
	}

	beforeShow(params) {
		console.log(params);
	}
}