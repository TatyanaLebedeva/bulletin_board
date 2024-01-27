(function (app) {
    app.PageProduct = {
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

            // ADSBoard.Header.draw();
            function createProduct(element) {
                let image = addElementWithText('p', '', 'product__image');
                let title = addElementWithText('p', element['name'], 'product__title');
                let about = addElementWithText('p', element['text'], 'product__about');
                let seller = addElementWithText('p', "Продавец: " + element['name'], 'product__seller');
                let sum = addElementWithText('p', element['price'], 'product__sum');
                let phoneButton = addElementWithText("button", "Показать телефон", "base_button");
                phoneButton.addEventListener("click", showPhone);

                let leftBlock = addElement("div", "left_block");
                leftBlock.id = element['ads_id'];
                leftBlock.append(image, phoneButton);

                let centerBlock = addElement("div", "center_block");
                centerBlock.append(title, about, seller);

                let rightBlock = addElement("div", "right_block");
                rightBlock.append(sum);

                let productBlock = addElement("div", "product_block");
                productBlock.id = element['ads_id'];
                productBlock.append(leftBlock, centerBlock, rightBlock);

                let productContent = document.querySelector(".product_content");
                productContent.append(productBlock);
            }
        }
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

    async function showPhone() {

        let url = '/scripts/index.php?user_id=8';

        let response = await fetch(url);
        let phoneNumber = '';
        if (response.ok) {
            let resultJson = await response.json();
            phoneNumber = resultJson['phone'];
        }
        let phone = addElementWithText('p', phoneNumber, 'product__phone');
        document.querySelector(".base_button").remove();

        let leftBlock = document.querySelector(".left_block");
        leftBlock.append(phone);
    }


})(ADSBoard);