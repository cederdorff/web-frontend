class Loader {
	constructor() {
		this.render();
		this.loader = document.querySelector(".loader");
	}
	/**
	 * renders the initial template of the page
	 */
	render() {
		document.querySelector("#root").insertAdjacentHTML(
			"beforeend",
			/*html*/ `
            <section class="loader">
                <section class="spinner"></section>
            </section>
        `
		);
	}

	show() {
		this.loader.classList.remove("hide");
	}

	hide() {
		this.loader.classList.add("hide");
	}
}

const loader = new Loader();
export default loader;
