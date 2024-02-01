(function (app) {
    app.PageAdChange = {
        draw: async function () {
            // let offset = document.querySelector('#offset').value;
            let offset = 0;
            let limit = 1;
            let url = '/scripts/board.php?offset=' + offset + '&limit=' + limit;

            let response = await fetch(url);

            if (response.ok) {
                let json = await response.json();
                json.forEach((element) => createProduct(element));
            } else {
                alert("Ошибка HTTP: " + response.status);
            }

            // ADSBoard.Header.draw(true);
            function createProduct(element) {
                let [nameField, name] = createElementAndText('name', "Название", "input_ad");
                let [priceField, formPrice] = createElementAndText('price', "Цена", "input_ad");
                let [descriptionField, formDescription] = createElementAndText('description', "Описание", "input_description");
                let image = addElementWithText('p', '', 'product__image');
                image.id = "image";

                let uploadButton = addElementWithText("button", "Загрузить фото", "upload_button");
                // uploadButton.addEventListener("click", changeAd);

                let saveButton = addElementWithText("button", "Сохранить", "save_button");
                saveButton.addEventListener("click", changeAd);

                let productImage = addElement('div', "upload_photo");
                productImage.append(image, uploadButton);

                let productAdBlock = addElement('div', "product_ad_block");
                productAdBlock.append(name, nameField, formDescription, descriptionField, formPrice, priceField, productImage, saveButton)

                let productBlock = document.querySelector(".product_content");
                productBlock.append(productAdBlock);
            }
        }
    }

    function changeAd() {
        // document.querySelector(".product_content").innerHTML = "";
        let name = document.getElementById("name").value;
        let description = document.getElementById("description").value;
        let image = document.getElementById("image").value;
        let price = document.getElementById("price").value;
        let userId = 4;
        let adsId = 6;
        let method = '';
        let params = '';

        if (adsId) {
            params = JSON.stringify({
                'text': description,
                'name': name,
                'price': price,
                'user_id': userId,
                'image_id': image,
                'ads_id': adsId
            });
            method = 'PUT';
        } else {
            params = new FormData();
            params.append('text', description);
            params.append('name', name);
            params.append('price', price);
            params.append('user_id', userId);
            if (image) {
                params.append('image_id', image);
            }
            method = 'POST';
        }

        fetch('scripts/board.php', {
            method: method,
            body: params
        })
            .then(
                response => {
                    if (!response.ok) {
                        console.log(response.text());
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