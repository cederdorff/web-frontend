class CreatePage {
    constructor() {
        this.id = "create";
        this.render();

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
                        <input type="text" name="firstname" id="firstname" placeholder="Firstname">
                        <input type="text" name="lastname" id="lastname" placeholder="Lastname">
                        <input type="number" name="age" id="age" placeholder="Age">
                        <input type="text" name="haircolor" id="haircolor" placeholder="Hair Color">
                        <input type="text" name="country" id="country" placeholder="Country">
                        <select name="gender" id="gender">
                        <option value="" selected disabled>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Binary">Binary</option>
                        </select>
                        <select name="lookingFor" id="lookingFor">
                        <option value="" selected disabled>Select looking for</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Binary">Binary</option>
                        </select>
                        <img id="imagePreview" class="image-preview">
                        <input type="file" name="fileToUpload" id="fileToUpload" accept="image/*"
                        onchange="previewImage(this.files[0], 'imagePreview')">
                        <button type="button" onclick="createUserEvent()">Save</button>
                    </form>
                </section>
            </section>
        `);
    }

    beforeShow(params) {
        console.log(params);
    }
}

const createPage = new CreatePage();
export default createPage;