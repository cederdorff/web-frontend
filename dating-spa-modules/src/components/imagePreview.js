class ImagePreview {
    constructor() {

    }

    render() {
        return /*html*/`
            <img class="image-preview">
            <input type="file" name="fileToUpload" accept="image/*" onchange="previewImage(this.files[0], 'imagePreview')">
        `;
    }
}