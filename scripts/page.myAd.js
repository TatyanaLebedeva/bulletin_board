(function (app) {
    app.PagemyAd = {
        draw: async function () {
            // import{ addElementWithText,addElement } from './product.service.js';
            // import{ addElement } from './product.service.js';

            let productContent = document.querySelector(".product_content");

            let addButton = addElementWithText("button", "Добавить", "add_button");
            addButton.addEventListener("click", addAd);
            productContent.append(addButton);

            // let offset = document.querySelector('#offset').value;
            let offset = 0;
            let limit = 4;
            let url = '/scripts/board.php?offset=' + offset + '&limit=' + limit;

            let response = await fetch(url);

            if (response.ok) {
                let json = await response.json();
                if (!json.status) {
                    let productContent = document.querySelector(".product_content");
                    productContent.append(addElementWithText('p', json.message, 'product__title'));
                } else {
                    json.result.forEach((element) => createProduct(element));
                }
            } else {
                alert("Ошибка HTTP: " + response.status);
            }

            // ADSBoard.Header.draw();
            function createProduct(element) {

                let changeButton = addElementWithText("button", "Изменить", "base_button");
                changeButton.addEventListener("click", changeAd);
                let deleteButton = addElementWithText("button", "Удалить", "base_button");
                deleteButton.addEventListener("click", deleteAd);
                let productButtonBlock = addElement("div", "change_block");
                productButtonBlock.append(changeButton, deleteButton);

                let image = addElement('img', 'product__image');
                let title = addElementWithText('p', element['name'], 'product__title');
                let about = addElementWithText('p', element['text'], 'product__about');
                let sum = addElementWithText('p', element['price'], 'product__sum');

                let leftBlock = addElement("div", "left_block");
                leftBlock.append(image, productButtonBlock);

                let centerBlock = addElement("div", "center_block");
                centerBlock.append(title, about, productButtonBlock);

                let rightBlock = addElement("div", "right_block");
                rightBlock.append(sum);

                let productBlock = addElement("div", "product_block");
                productBlock.id = element['ads_id'];
                productBlock.append(leftBlock, centerBlock, rightBlock);

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

    function changeAd() {
        let productBlock = this.parentNode.parentNode.parentNode;
        let adsId = productBlock.id;
        let title = productBlock.querySelector(".product__title").innerText;
        let about = productBlock.querySelector(".product__about").innerText;
        let sum = productBlock.querySelector(".product__sum").innerText;
        document.querySelector(".product_content").innerHTML = "";
        app.PageAdChange.draw(adsId, title, about, sum);
    }

    function addAd() {
        document.querySelector(".product_content").innerHTML = "";
        app.PageAdChange.draw();
    }

    function deleteAd() {
        let adsId = this.parentNode.parentNode.parentNode.id;
        let params = JSON.stringify({
            'ads_id': adsId
        });
        fetch('scripts/board.php', {
            method: 'DELETE',
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
                })
    }
})(ADSBoard);