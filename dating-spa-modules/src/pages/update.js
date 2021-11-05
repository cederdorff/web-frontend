class UpdatePage {
    constructor() {
        this.id = "update";
        this.render();
        this.selectedUserId;
    }

    render() {
        document.querySelector("#root").insertAdjacentHTML("beforeend", /*html*/`
            <section id="${this.id}" class="page">
                <header class="topbar">
                    <a class="left" onclick="showUserPage()">Cancel</a>
                    <h2>Update User</h2>
                </header>
                <section>
                    <form>
                        <input type="text" name="firstnameUpdate" id="firstnameUpdate" placeholder="Firstname">
                        <input type="text" name="lastnameUpdate" id="lastnameUpdate" placeholder="Lastname">
                        <input type="number" name="ageUpdate" id="ageUpdate" placeholder="Age">
                        <input type="text" name="haircolorUpdate" id="haircolorUpdate" placeholder="Hair Color">
                        <input type="text" name="countryUpdate" id="countryUpdate" placeholder="Country">
                        <select name="genderUpdate" id="genderUpdate">
                            <option value="" selected disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Binary">Binary</option>
                        </select>
                        <select name="lookingForUpdate" id="lookingForUpdate">
                            <option value="" selected disabled>Select looking for</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Binary">Binary</option>
                        </select>
                        <img id="imagePreviewUpdate" class="image-preview">
                        <input type="file" name="fileToUpload" id="fileToUploadUpdate" accept="image/*"
                        onchange="previewImage(this.files[0], 'imagePreviewUpdate')">
                        <button type="button" onclick="updateUserEvent()">Save</button>
                    </form>
                </section>
            </section>

        `);
    }

    beforeShow(params) {
        console.log(params);
        const userToUpdate = params.data.selectedUser;
        console.log(userToUpdate);
        document.querySelector("#firstnameUpdate").value = userToUpdate.firstname;
        document.querySelector("#lastnameUpdate").value = userToUpdate.lastname;
        document.querySelector("#ageUpdate").value = userToUpdate.age;
        document.querySelector("#haircolorUpdate").value = userToUpdate.haircolor;
        document.querySelector("#countryUpdate").value = userToUpdate.countryName;
        document.querySelector("#genderUpdate").value = userToUpdate.gender;
        document.querySelector("#lookingForUpdate").value = userToUpdate.lookingFor;
        document.querySelector("#imagePreviewUpdate").src = `backend/small/${userToUpdate.image || "placeholder.jpg"}`;
        document.querySelector("#fileToUploadUpdate").value = "" // reset value
    }
}

const updatePage = new UpdatePage();
export default updatePage;