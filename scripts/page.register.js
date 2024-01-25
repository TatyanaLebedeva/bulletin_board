(function (app) {
    app.PageRegister = {
        draw: function () {

            ADSBoard.Header.draw(true);

            let registration = document.createElement("div");
            registration.append(document.createTextNode("Регистрация"));
            registration.classList.add("form_name");

            let [emailField, formEmail] = createElement('email', "E-mail");

            let [phoneField, formPhone] = createElement('phone', "Телефон");

            let [surnameField, formSurname] = createElement('username', "ФИО");

            let [passwordField, formPassword] = createElement('password', "Пароль");

            let [passConfirField, formPassConfir] = createElement('pass_confir', "Подтверждение пароля");

            let container = document.querySelector(".container");
            container.append(emailField, formEmail, phoneField, formPhone, surnameField, formSurname, passwordField, formPassword, passConfirField, formPassConfir);

            let registerButton = createButton("Зарегистрироваться");

            let entryButton = createButton("Войти");

            registerButton.addEventListener("click", endToRegister);
            let content = document.querySelector(".content");
            content.append(registration, container, registerButton, entryButton);
        }
    }

    function createElement(id, name) {
        let newField = document.createElement("input");
        newField.classList.add("input");
        newField.id = id;
        let newForm = document.createElement("p");
        newForm.append(document.createTextNode(name));
        newForm.classList.add("form_text");
        return [newField, newForm];
    }

    function createButton(name) {
        let newButton = document.createElement("button");
        newButton.classList.add('auth_button');
        newButton.append(document.createTextNode(name));
        return newButton;
    }

    function endToRegister() {
        let userEmail = document.querySelector('#email').value;
        let userPhone = document.querySelector('#phone').value;
        let userName = document.querySelector('#username').value;
        let userPassword = document.querySelector('#password').value;
        let userConfirmPassword = document.querySelector('#pass_confir').value;

        let params = new FormData();
        params.append('email', userEmail);
        params.append('phone', userPhone);
        if (userName) {
            params.append('username', userName);
        }

        params.append('password', userPassword);

        if (userPassword !== userConfirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        console.log(JSON.stringify(params));

        fetch('scripts/index.php', {
            method: 'POST',
            body: params
        })
            .then(
                response => {
                    if (!response.ok) {
                        console.log(response.text());
                        return response.text().then(text => {
                            throw new Error(text)
                        });
                    }
                    return response.json();
                })
            .then(
                result => {
                    alert(result.message);
                    console.dir(result.message);
                    if (result.status === true) {
                        // BillBoard.Functions.goToLogin();
                    }
                }
            )
            // .catch(
            //     error => {
            //         console.error(error);
            //     }
            // );
    }
})(ADSBoard);