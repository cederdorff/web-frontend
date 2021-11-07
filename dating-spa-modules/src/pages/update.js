import services from "../services.js";
import router from "../router.js";

class UpdatePage {
    constructor() {
        this.id = "update";
        this.render();
        this.selectedUserId;

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
                    <a class="left cancel">Cancel</a>
                    <h2>Update User</h2>
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
                        <input type="file" name="profileImage" accept="image/*"
                        onchange="previewImage(this.files[0], 'imagePreviewUpdate')">
                        <button type="button" class="update">Save</button>
                    </form>
                </section>
            </section>

        `);
    }

    attachEvents() {
        document.querySelector(`#${this.id} .cancel`).onclick = () => router.goBack();
    }

    async beforeShow(params) {
        console.log(params);

        const userData = await services.getUserData(params.id);
        const userToUpdate = userData.selectedUser;
        console.log(userToUpdate);
        this.firstnameInput.value = userToUpdate.firstname;
        this.lastnameInput.value = userToUpdate.lastname;
        this.ageInput.value = userToUpdate.age;
        this.haircolorInput.value = userToUpdate.haircolor;
        this.countryInput.value = userToUpdate.countryName;
        this.genderInput.value = userToUpdate.gender;
        this.lookingForInput.value = userToUpdate.lookingFor;
        this.imagePreview.src = `backend/small/${userToUpdate.image || "placeholder.jpg"}`;
        this.imageInput.value = "" // reset value
    }
}

const updatePage = new UpdatePage();
export default updatePage;