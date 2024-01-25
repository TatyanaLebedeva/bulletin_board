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
                json.forEach((element) => createProduct(element['name'],
                    element['text'],
                    element['price'],
                    element['name'] ));
                // console.dir(json);
            } else {
                alert("Ошибка HTTP: " + response.status);
            }

            // ADSBoard.Header.draw();
            function createProduct(nameProduct, textProduct, stringPrice, fulName) {

                let phone = aboutProduct();
                phone.className = 'product__phone';

                let image = aboutProduct();
                image.className = 'product__image';

                // let image = document.createElement('p');
                // image.className = 'product__image';
                // let phone = document.createElement('p');
                // phone.className = 'product__phone';

                let phoneButton = document.createElement("button");
                phoneButton.classList.add("base_button");
                phoneButton.append(document.createTextNode("Показать телефон"));

                let title = document.createElement('p');
                title.append(document.createTextNode(nameProduct));
                title.className = 'product__title';
                let about = document.createElement('p');
                about.append(document.createTextNode(textProduct));
                about.className = 'product__about';
                let seller = document.createElement('p');
                seller.append(document.createTextNode("Продавец: " + fulName));
                seller.className = 'product__seller';

                let sum = document.createElement('p');
                sum.append(document.createTextNode(stringPrice));
                sum.className = 'product__sum';

                let leftBlock = document.querySelector(".left_block");
                leftBlock.append(image, phone, phoneButton);

                phoneButton.addEventListener("click", showPhone);

                let centerBlock = document.querySelector(".center_block");
                centerBlock.append(title, about, seller);

                let rightBlock = document.querySelector(".right_block");
                rightBlock.append(sum);

                let productBlock = document.querySelector(".product_block");
                productBlock.append(leftBlock, centerBlock, rightBlock);

                let productContent = document.querySelector(".product_content");
                productContent.append(productBlock);
            }
        }
    }

    function showPhone() {
        document.querySelector(".base_button").remove();
        let leftBlock = document.querySelector(".left_block");
        leftBlock.append('stringPhone');
    }

    function aboutProduct(name) {
        let newProduct = document.createElement("p");
        newProduct.append(document.createTextNode(name));
        return newProduct;
    }

})(ADSBoard);