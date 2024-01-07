(function (app) {
    app.PageRegister = {
        draw: function () {

            ADSBoard.Header.draw(true);

            let registration = document.createElement("div");
            registration.append(document.createTextNode("Регистрация"));
            registration.classList.add("form_name");

            let passwordField = document.createElement("input");
            passwordField.classList.add("input");

            let formEmail = document.createElement("p");
            formEmail.append(document.createTextNode("E-mail"));
            formEmail.classList.add("form_text");

            let phoneField = document.createElement("input");
            phoneField.classList.add("input");

            let formPhone = document.createElement("p");
            formPhone.append(document.createTextNode("Телефон"));
            formPhone.classList.add("form_text");

            let surnameField = document.createElement("input");
            surnameField.classList.add("input");

            let formSurname = document.createElement("p");
            formSurname.append(document.createTextNode("ФИО"));
            formSurname.classList.add("form_text");

            let formPassword = document.createElement("p");
            formPassword.append(document.createTextNode("Пароль"));
            formPassword.classList.add("form_text");

            let passConfirField = document.createElement("input");
            passConfirField.classList.add("input");

            let formPassConfir = document.createElement("p");
            formPassConfir.append(document.createTextNode("Подтверждение пароля"));
            formPassConfir.classList.add("form_text");

            let emailField = document.createElement("input");
            emailField.classList.add("input");
            let container = document.querySelector(".container");
            container.append(emailField, formEmail, phoneField, formPhone, surnameField, formSurname, passwordField, formPassword, passConfirField, formPassConfir);

            let registerButton = document.createElement("button");
            registerButton.classList.add("auth_button");
            registerButton.append(document.createTextNode("Зарегистрироваться"));

            let entryButton = document.createElement("button");
            entryButton.classList.add("auth_button");
            entryButton.append(document.createTextNode("Войти"));

            registerButton.addEventListener("click", endToRegister);
            let content = document.querySelector(".content");
            content.append(registration, container, registerButton, entryButton);
        }
    }

    function endToRegister() {

    }
})(ADSBoard);