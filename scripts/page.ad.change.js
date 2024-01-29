(function (app) {
    app.PageAdChange = {
        draw: async function () {

            // let offset = document.querySelector('#offset').value;
            let offset = 0;
            let limit = 4;
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

                let [nameField, name] = createElement('name', "Название");
                // let [descriptionField, formDescription] = createElement('email', "Описание");
                let [priceField, formPrice] = createElement('price', "Цена");

                let descriptionField = document.createElement("input");
                descriptionField.classList.add("input_description");
                let formDescription = document.createElement("p");
                formDescription.append(document.createTextNode("Описание"));
                formDescription.classList.add("form_text_ad");

                let image = addElementWithText('p', '', 'product__image');

                let uploadButton = addElementWithText("button", "Загрузить фото", "upload_button");
                let saveButton = addElementWithText("button", "Сохранить", "save_button");

                // saveButton.addEventListener("click", changeAd);

                let productImage = addElement('div', "upload_photo");
                productImage.append(image, uploadButton);

                let productAdBlock = addElement('div', "product_ad_block");
                productAdBlock.append(name, nameField, formDescription, descriptionField, formPrice, priceField, productImage, saveButton)

                let productBlock = document.querySelector(".product_content");
                productBlock.append(productAdBlock);


                // registerButton.addEventListener("click", endToRegister);
                // let content = document.querySelector(".content");
                // content.append(registration, container, registerButton, entryButton);
            }
        }
    }

    function endToRegister() {

    }

    function createElement(id, name) {
        let newField = document.createElement("input");
        newField.classList.add("input_ad");
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