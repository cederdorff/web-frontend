class CreatePage {
    constructor() {
        this.id = "create"; this.render();

        this.firstnameInput = document.querySelector(`#${this.id} [name="firstname"]`);
        this.lastnameInput = document.querySelector(`#${this.id} [name="lastname"]`);
        this.ageInput = document.querySelector(`#${this.id} [name="age"]`);
        this.haircolorInput = document.querySelector(`#${this.id} [name="haircolor"]`);
        this.countryInput = document.querySelector(`#${this.id} [name="country"]`);
        this.genderInput = document.querySelector(`#${this.id} [name="gender"]`);
        this.lookingForInput = document.querySelector(`#${this.id} [name="lookingFor"]`);
        this.imagePreview = document.querySelector(`#${this.id} [name="imagePreview"]`);
        this.imageInput = document.querySelector(`#${this.id} [name="profileImage"]`);

        this.attachEvents();
    }

    render() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", /*html*/`
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a href="#/" class="router-link left">Cancel</a>
                    <h2>Create new user</h2>
                </header>
                <section>
                    <form>
                        <input type="text" name="firstname" placeholder="Firstname">
                        <input type="text" name="lastname" placeholder="Lastname">
                        <input type="number" name="age" placeholder="Age">
                        <input type="text" name="haircolor" placeholder="Hair Color">
                        <input type="text" name="country" placeholder="Country">
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
        `);
    }

    attachEvents() {
        this.imageInput.onchange = () => this.previewImage();
    }

    previewImage() {
        const file = this.imageInput.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = event => {
                this.imagePreview.setAttribute('src', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    beforeShow(params) {
        console.log(params);
    }
}

const createPage = new CreatePage();
export default createPage;