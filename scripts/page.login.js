(function (app) {
    app.PageLogin = {
        draw: function () {
            ADSBoard.Header.draw(true);

            let entrance = document.createElement("div");
            entrance.append(document.createTextNode("Вход"));
            entrance.classList.add("form_name");

            let [emailField, formEmail] = createElement('email', "E-mail");

            let [passwordField, formPassword] = createElement('password', "Пароль");

            let entryButton = createButton("Войти");

            let registerButton = createButton("Зарегистрироваться");

            entryButton.addEventListener("click", goToLogin);

            registerButton.addEventListener("click", goToRegister);

            let container = document.querySelector(".container");
            container.append(emailField, formEmail, passwordField, formPassword);

            let content = document.querySelector(".content");
            content.append(entrance, container, entryButton, registerButton);
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

    function goToRegister() {
        document.querySelector(".container").innerHTML = "";
        document.querySelector(".auth_button").remove();
        document.querySelector(".auth_button").remove();
        document.querySelector(".form_name").remove();
        app.PageRegister.draw();
    }

    function goToLogin() {
        let userEmail = document.querySelector('#email').value;
        let userPassword = document.querySelector('#password').value;


        let params = new FormData();
        params.append('email', userEmail);
        params.append('password', userPassword);

        console.log(params);

        fetch('scripts/auth.php', {
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
            .catch(
                error => {
                    console.error(error);
                }
            );
    }
})(ADSBoard);