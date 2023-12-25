(function (app) {
    app.Header = {
        draw: function () {
            let name=document.createElement("p");
            name.append(document.createTextNode("Объявление.RU"));

            let formTape = document.createElement("p");
            formTape.append(document.createTextNode("Лента"));
            // formTape.classList.add(".form_header_text");

            let formAd = document.createElement("p");
            formAd.append(document.createTextNode("Мои объявления"));
            // formAd.classList.add(".form_header_text");

            let formExit = document.createElement("p");
            formExit.append(document.createTextNode("Выход"));
            // formExit.classList.add(".form_header_text");

            let rightBlockHeader = document.querySelector(".right_block_header");
            rightBlockHeader.append(formTape, formAd, formExit);


            let block = document.querySelector(".position_header");
            block.append(name, rightBlockHeader);

            document.querySelector("header")
                .append(block);
        }
    }
})(ADSBoard);