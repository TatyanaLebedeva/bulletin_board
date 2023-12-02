<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['id'])) {
        echo "Один пользователь";
    } else {
        echo "Все пользователи";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        echo "Пользователь создан";
    } else {
        echo "Не введено имя или пароль";
    }
}


if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    if (isset($_PUT['user_id'])) {
        $password = getUserPass((int)$_PUT['user_id']);
    } else {
        echo "Пользователь не найден";
        exit();
    }
    if (isset($_PUT['password']) && $_PUT['password'] !== $password) {
        echo "Пароль пользователя успешно обновлён";
    } else {
        echo "Пароль не должен совпадать";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (isset($_DELETE['user_id'])) {
        $isDeleted = deleteUser((int)$_DELETE['user_id']);
        if ($isDeleted) {
            echo "Пользователь успешно удалён";
        } else {
            echo "Пользователь не удалён";
        }
    }
    else {
        echo "Невозможно найтипользователя";
    }
}

function getUserPass(int $userId): string
{
    //Получаем пароль пользователя из базы данных
    return '';
}

function deleteUser(int $userId): bool
{
// Удалить пользователя из базы данных
    return true;
}
