export default class CreatePage {
	constructor(id) {
		this.id = id;
		this.render();
	}

	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a href="/" class="router-link left">Cancel</a>
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

	beforeShow(props) {
		console.log(props);
	}
}
