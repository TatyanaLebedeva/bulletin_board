(function (app) {
    app.PageProduct = {
        draw: function () {
            // ADSBoard.Header.draw();

            let image = document.createElement('p');
            image.className = 'product__image';
            let phone = document.createElement('p');
            phone.className = 'product__phone';
            let phoneButton = document.createElement("button");
            phoneButton.classList.add("phone_button");
            phoneButton.append(document.createTextNode("Показать телефон"));

            let title = document.createElement('p');
            title.append(document.createTextNode("Планшет Galaxy tab"));
            title.className = 'product__title';
            let about = document.createElement('p');
            about.append(document.createTextNode("Немного потрепанный, цвет черный"));
            about.className = 'product__about';
            let seller = document.createElement('p');
            seller.append(document.createTextNode("Продавец: Сосорев О.А."));
            seller.className = 'product__seller';

            let sum = document.createElement('p');
            sum.append(document.createTextNode("3000 p"));
            sum.className = 'product__sum';

            let leftBlock = document.querySelector(".left_block");
            leftBlock.append(image, phone, phoneButton);

            phoneButton.addEventListener("click", showPhone);

            let centerBlock = document.querySelector(".center_block");
            centerBlock.append(title, about);

            let rightBlock = document.querySelector(".right_block");
            rightBlock.append(sum);

            let productBlock = document.querySelector(".product_block");
            productBlock.append(leftBlock, centerBlock, rightBlock);

            let productContent = document.querySelector(".product_content");
            productContent.append(productBlock, seller);
        }
    }

    function showPhone() {
        document.querySelector(".phone_button").remove();
        let leftBlock = document.querySelector(".left_block");
        leftBlock.append("+7 968 562 32 52");
    }

})(ADSBoard);