export default class UpdatePage {
	constructor(id) {
		this.id = id;
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
