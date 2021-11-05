class Loader {
    constructor() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", this.render());
    }

    render() {
        return /*html*/`
            <section class="loader">
                <section class="spinner"></section>
            </section>
        `;
    }
}