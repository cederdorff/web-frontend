import services from "../services.js";
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

	async save() {
		if (this.validate()) {
			loader.show();
			if (this.imageInput.files[0]) {
				const image = await services.uploadImage(this.imageInput.files[0]);
				console.log(image);
				this.selectedUser.image = image.name;
			}

			const users = await services.updateUser(
				this.selectedUser.id,
				this.nameInput.value,
				this.ageInput.value,
				this.genderInput.value,
				this.lookingForInput.value,
				this.selectedUser.image
			);
			router.navigateTo(`/user/${this.selectedUser.id}`, { users: users });
			loader.hide();
		}
	}

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

	async beforeShow(params) {
		loader.show();
		const user = await services.getUser(params.id);
		this.selectedUser = user;

		this.nameInput.value = this.selectedUser.name;
		this.ageInput.value = this.selectedUser.age;
		this.genderInput.value = this.selectedUser.gender;
		this.lookingForInput.value = this.selectedUser.lookingFor;
		this.imagePreview.src = `${services.baseUrl}/files/medium/${
			this.selectedUser.image || "placeholder.jpg"
		}`;
		this.imageInput.value = ""; // reset value
		loader.hide();
	}
}
