(function (app) {
    app.PageAdChange = {
        draw: function () {

            // ADSBoard.Header.draw(true);
            let nameField = document.createElement("input");
            nameField.classList.add("input_ad");

            let name = document.createElement("div");
            name.append(document.createTextNode("Название"));
            name.classList.add("form_text_ad");

            let descriptionField = document.createElement("input");
            descriptionField.classList.add("input_description");

            let formDescription = document.createElement("p");
            formDescription.append(document.createTextNode("Описание"));
            formDescription.classList.add("form_text_ad");

            let priceField = document.createElement("input");
            priceField.classList.add("input_ad");

            let formPrice = document.createElement("p");
            formPrice.append(document.createTextNode("Цена"));
            formPrice.classList.add("form_text_ad");


            let image = document.createElement('p');
            image.className = 'product__image';

            let uploadButton = document.createElement("button");
            uploadButton.classList.add("upload_button");
            uploadButton.append(document.createTextNode("Загрузить фото"));

            let saveButton = document.createElement("button");
            saveButton.classList.add("save_button");
            saveButton.append(document.createTextNode("Сохранить"));

            // saveButton.addEventListener("click", changeAd);
            let productImage=document.createElement("div");
            productImage.classList.add("upload_photo");
            productImage.append(image, uploadButton);

            let productAdBlock=document.createElement("div");
            productAdBlock.classList.add("product_ad_block");
            productAdBlock.append(name,nameField, formDescription, descriptionField, formPrice, priceField,productImage,saveButton)

            let productBlock = document.querySelector(".product_content");
            productBlock.append(productAdBlock);


            // registerButton.addEventListener("click", endToRegister);
            // let content = document.querySelector(".content");
            // content.append(registration, container, registerButton, entryButton);
        }
    }

    function endToRegister() {

    }
})(ADSBoard);