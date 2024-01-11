(function (app) {
    app.Header = {
        draw: function (short) {

            let existing_name = document.querySelector(".block_header p");
            if (existing_name) {
                existing_name.remove()
            }

            let name = document.createElement("p");
            name.append(document.createTextNode("Объявление.RU"));

            let block = document.querySelector(".block_header");
            block.append(name);

            // if (!short) {
            //     let menu=document.querySelector(".menu");
            //
            //     let formTape = document.createElement("li");
            //     let ribbon=document.createElement("a");
            //     ribbon.append(document.createTextNode("Лента"));
            //     ribbon.className = 'topic menu__section';
            //     formTape.append(ribbon);
            //
            //     menu.append(formTape);
            //     block.append(menu);
            // }

            document.querySelector("header").append(block);
            // block.addEventListener("click", cleanToHead);
        }
    }

    function cleanToHead() {
        // document.querySelector(".right_block_header").remove();
    }
})(ADSBoard);

