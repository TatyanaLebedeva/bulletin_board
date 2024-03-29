(function (app) {
    app.PageAdChange = {
        draw: async function (adsId, title, about, sum, imageId, imageSrc) {
            createProduct(adsId, title, about, sum, imageId, imageSrc);

            // ADSBoard.Header.draw(true);
            function createProduct(adsId, title, about, sum, imageId, imageSrc) {
                let [nameField, name] = createElementAndText('name', "Название", "input_ad");
                if (title) {
                    nameField.value = title;
                }
                let [priceField, formPrice] = createElementAndText('price', "Цена", "input_ad");
                if (sum) {
                    priceField.value = sum;
                }
                let [descriptionField, formDescription] = createElementAndText('description', "Описание", "input_description");
                if (about) {
                    descriptionField.value = about;
                }
                let inputImage = document.createElement('input');
                inputImage.type = 'file';
                inputImage.id = "file_image";

                const preview = document.createElement("div");
                preview.classList.add("preview");

                let uploadButton = addElementWithText("button", "Загрузить фото", "upload_button");

                const triggerInput = () => inputImage.click();
                const changeImage = event => {
                    if (!event.target.files.length) {
                        return;
                    }
                    const files = Array.from(event.target.files);
                    let previewImage = productImage.querySelector('img');
                    files.forEach(file => {
                            if (!file.type.match('image')) {
                                return;
                            }
                            const reader = new FileReader();
                            reader.onload = ev => {
                                previewImage.id = "image";
                                previewImage.src = ev.target.result;
                            }
                            reader.readAsDataURL(file);
                        }
                    )
                }
                uploadButton.addEventListener("click", triggerInput);
                inputImage.addEventListener("change", changeImage);

                let saveButton = addElementWithText("button", "Сохранить", "save_button");
                if (adsId) {
                    saveButton.id = adsId;
                }
                saveButton.addEventListener("click", changeAd);

                let productImage = addElement('div', "upload_photo");
                let defaultImage = addElement('img', 'product__image');
                if (imageSrc) {
                    defaultImage.src = imageSrc;
                    defaultImage.title = imageId;
                }
                if (!productImage.querySelector('img')) {
                    productImage.append(defaultImage);
                }
                productImage.append(inputImage, uploadButton);

                let productAdBlock = addElement('div', "product_ad_block");
                productAdBlock.append(name, nameField, formDescription, descriptionField, formPrice, priceField, productImage, saveButton)

                let productBlock = document.querySelector(".product_content");
                productBlock.append(productAdBlock);
            }
        }
    }

    function changeAd() {
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let image = document.getElementById("file_image").files[0];
        let imageObj = document.getElementById("image");
        let imageId = '';
        if (imageObj) {
            imageId = imageObj.title;
        }
        let price = document.getElementById("price").value;
        let adsId = this.id;

        if (!name || !description || !price) {
            alert("Не все поля заполнены");
            return;
        }

        let params = new FormData();
        params.append('text', description);
        params.append('name', name);
        params.append('price', price);

        if (adsId) {
            params.append('ads_id', adsId);
        }
        if (image) {
            params.append('image', image);
            if (imageId) {
                params.append('image_id', imageId);
            }
        }

        fetch('scripts/board.php', {
            method: 'POST',
            body: params
        })
            .then(
                response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(text)
                        });
                    }
                    return response.json();
                })
            .then(
                result => {
                    alert(result.message);
                    if (result.status === true) {
                        window.location.reload();
                    }
                }
            )
    }

    function createElementAndText(id, name, className) {
        let newField = document.createElement("input");
        newField.classList.add(className);
        newField.id = id;
        let newForm = document.createElement("div");
        newForm.append(document.createTextNode(name));
        newForm.classList.add("form_text_ad");
        return [newField, newForm];
    }

    function addElementWithText(tag, text, className) {
        let textElement = addElement(tag, className);
        textElement.append(document.createTextNode(text));
        return textElement;
    }

    function addElement(tag, className) {
        let element = document.createElement(tag);
        element.className = className;
        return element;
    }
})(ADSBoard);
