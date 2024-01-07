(function (app) {
    app.PageLogin = {
        draw: function () {
            ADSBoard.Header.draw(true);

            let entrance = document.createElement("div");
            entrance.append(document.createTextNode("Вход"));
            entrance.classList.add("form_name");

            let passwordField = document.createElement("input");
            passwordField.classList.add("input");

            let formEmail = document.createElement("p");
            formEmail.append(document.createTextNode("E-mail"));
            formEmail.classList.add("form_text");

            let entryButton = document.createElement("button");
            entryButton.classList.add("auth_button");
            entryButton.append(document.createTextNode("Войти"));

            let formPassword = document.createElement("p");
            formPassword.append(document.createTextNode("Пароль"));
            formPassword.classList.add("form_text");

            let emailField = document.createElement("input");
            emailField.classList.add("input");

            let registerButton = document.createElement("button");
            registerButton.classList.add("auth_button");
            registerButton.append(document.createTextNode("Зарегистрироваться"));

            registerButton.addEventListener("click", goToRegister);

            let container = document.querySelector(".container");
            container.append(emailField, formEmail, passwordField, formPassword);

            let content = document.querySelector(".content");
            content.append(entrance, container, entryButton, registerButton);
        }
    }

    function goToRegister() {
        document.querySelector(".container").innerHTML = "";
        document.querySelector(".auth_button").remove();
        document.querySelector(".auth_button").remove();
        document.querySelector(".form_name").remove();
        app.PageRegister.draw();
    }
})(ADSBoard);