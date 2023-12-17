(function (app) {
    app.Header = {
        draw: function () {
            document.querySelector("header")
                .append(document.createTextNode("Объявление.RU"));
        }
    }
})(ADSBoard);