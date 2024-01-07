(function (app) {
    app.Header = {
        draw: function (short) {

            let existing_name = document.querySelector(".position_header p");
            if (existing_name) {
                existing_name.remove()
            }

            let name = document.createElement("p");
            name.append(document.createTextNode("Объявление.RU"));

            let block = document.querySelector(".position_header");

            block.append(name);
            let rightBlockHeader = document.querySelector(".right_block_header");
            block.append(rightBlockHeader);

            document.querySelector("header")
                .append(block);
            document.querySelector(".right_block_header").innerHTML = "";

            if (!short) {
                let formTape = document.createElement("p");
                formTape.append(document.createTextNode("Лента"));
                formTape.classList.add(".form_header_text");

                let formAd = document.createElement("p");
                formAd.append(document.createTextNode("Мои объявления"));
                formAd.classList.add(".form_header_text");

                let formExit = document.createElement("p");
                formExit.append(document.createTextNode("Выход"));
                formExit.classList.add(".form_header_text");  /// Рисуем меню


                rightBlockHeader.append(formTape, formAd, formExit);

            }

            // block.addEventListener("click", cleanToHead);
        }
    }
    function cleanToHead() {
        // document.querySelector(".right_block_header").remove();
    }
})(ADSBoard);

