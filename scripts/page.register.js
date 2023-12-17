(function (app) {
    app.PageRegister = {
        draw: function () {
            let registration = document.createElement("div");
            registration.append(document.createTextNode("Регистрация"));
            registration.classList.add("formName");

            let passwordField = document.createElement("input");
            passwordField.classList.add("input");

            let formEmail = document.createElement("p");
            formEmail.append(document.createTextNode("E-mail"));
            formEmail.classList.add("formText");

            let phoneField = document.createElement("input");
            phoneField.classList.add("input");

            let formPhone = document.createElement("p");
            formPhone.append(document.createTextNode("Телефон"));
            formPhone.classList.add("formText");

            let surnameField = document.createElement("input");
            surnameField.classList.add("input");

            let formSurname = document.createElement("p");
            formSurname.append(document.createTextNode("ФИО"));
            formSurname.classList.add("formText");

            let formPassword = document.createElement("p");
            formPassword.append(document.createTextNode("Пароль"));
            formPassword.classList.add("formText");

            let passConfirField = document.createElement("input");
            passConfirField.classList.add("input");

            let formPassConfir = document.createElement("p");
            formPassConfir.append(document.createTextNode("Подтверждение пароля"));
            formPassConfir.classList.add("formText");

            let emailField = document.createElement("input");
            emailField.classList.add("input");
            let container = document.querySelector(".container");
            container.append(emailField, formEmail, phoneField, formPhone, surnameField, formSurname, passwordField, formPassword, passConfirField, formPassConfir);

            let registerButton = document.createElement("button");
            registerButton.classList.add("button");
            registerButton.append(document.createTextNode("Зарегистрироваться"));

            let entryButton = document.createElement("button");
            entryButton.classList.add("button");
            entryButton.append(document.createTextNode("Войти"));

            registerButton.addEventListener("click", endToRegister);
            let content = document.querySelector(".content");
            content.append(registration, container, registerButton, entryButton);
        }
    }

    function endToRegister() {

    }
})(ADSBoard);