(function (app) {
    app.PagemyAd = {
        draw: function () {

            // ADSBoard.Header.draw();
            let addButton = document.createElement("button");
            addButton.classList.add("add_button");
            addButton.append(document.createTextNode("Добавить"));
            // Button.addEventListener("click");

            let changeButton = document.createElement("button");
            changeButton.classList.add("base_button");
            changeButton.append(document.createTextNode("Изменить"));

            changeButton.addEventListener("click", changeAd);

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("base_button");
            deleteButton.append(document.createTextNode("Удалить"));


            let productButtonBlock=document.createElement("div");
            productButtonBlock.classList.add("change_block");
            productButtonBlock.append(changeButton, deleteButton);

            let image = document.createElement('p');
            image.className = 'product__image';


            let title = document.createElement('p');
            title.append(document.createTextNode("Планшет Galaxy tab"));
            title.className = 'product__title';
            let about = document.createElement('p');
            about.append(document.createTextNode("Немного потрепанный, цвет черный"));
            about.className = 'product__about';

            let sum = document.createElement('p');
            sum.append(document.createTextNode("3000 p"));
            sum.className = 'product__sum';

            let leftBlock = document.querySelector(".left_block");
            leftBlock.append(image);

            let centerBlock = document.querySelector(".center_block");
            centerBlock.append(title, about, productButtonBlock);

            let rightBlock = document.querySelector(".right_block");
            rightBlock.append(sum);

            let productBlock = document.querySelector(".product_block");
            productBlock.append(leftBlock, centerBlock, rightBlock);

            let productContent = document.querySelector(".product_content");
            productContent.append(addButton, productBlock);
        }
    }
    // function showPhone() {
    //     document.querySelector(".base_button").remove();
    //     let leftBlock=document.querySelector(".left_block");
    //     leftBlock.append("+7 968 562 32 52");
    // }
    function changeAd() {
        document.querySelector(".product_content").innerHTML = "";
        // document.querySelector(".auth_button").remove();
        // document.querySelector(".auth_button").remove();
        // document.querySelector(".form_name").remove();
        app.PageAdChange.draw();
    }
})(ADSBoard);