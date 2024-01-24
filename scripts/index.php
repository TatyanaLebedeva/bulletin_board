<?php
require_once 'User.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['user_id']) && $_GET['user_id']) {
        $userId = (int)$_GET['user_id'];
        $user = new User();
        $result = $user->getUser($userId);
        print_r($result);
    } else {
        echo "Все пользователи";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['username']) && isset($_POST['password'])) {
        $email = null;
        if ($_POST['email']) {
            $email = (string)$_POST['email'];
        } else {
            $message = "Не указан e-mail";
            echo json_encode(['status' => false, 'message' => $message]);
        }
        if ($email) {
            $user = new User();
            $userByEmail = $user->getUserByEmail($email);
            if ($userByEmail) {
                $message = "Пользователь с таким e-mail уже существует";
                echo json_encode(['status' => false, 'message' => $message]);
            }
        }
        $phone = null;
        if ($_POST['phone']) {
            $phone = (string)$_POST['phone'];
        } else {
            $message = "Не указан телефон";
            echo json_encode(['status' => false, 'message' => $message]);
        }
        $username = null;
        if ($_POST['username'] && iconv_strlen($_POST['username']) > 3) {
            $username = (string)$_POST['username'];
        } else {
            $message = "Не указано ФИО";
            echo json_encode(['status' => false, 'message' => $message]);
        }
        $password = null;
        if ($_POST['password']) {
            $password = (string)$_POST['password'];
        } else {
            $message = "Не указан пароль";
            echo json_encode(['status' => false, 'message' => $message]);
        }
        if ($email && $phone && $username && $password) {
            $user = new User();
            $user->addUser($email, $phone, $username, $password);
            $message = "Пользователь создан";
            echo json_encode(['status' => true, 'message' => $message]);
        } else {
            $message = "Не все поля заполнены";
            echo json_encode(['status' => false, 'message' => $message]);
        }
    }
    $message = "Не все поля заполнены";
    echo json_encode(['status' => false, 'message' => $message]);
}

//
//if ($_SERVER["REQUEST_METHOD"] == "PUT") {
//    if (isset($_PUT['user_id'])) {
//        $password = getUserPass((int)$_PUT['user_id']);
//    } else {
//        echo "Пользователь не найден";
//        exit();
//    }
//    if (isset($_PUT['password']) && $_PUT['password'] !== $password) {
//        echo "Пароль пользователя успешно обновлён";
//    } else {
//        echo "Пароль не должен совпадать";
//    }
//}
//if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
//    if (isset($_DELETE['user_id'])) {
//        $isDeleted = deleteUser((int)$_DELETE['user_id']);
//        if ($isDeleted) {
//            echo "Пользователь успешно удалён";
//        } else {
//            echo "Пользователь не удалён";
//        }
//    } else {
//        echo "Невозможно найти пользователя";
//    }
//}
//
//function getUserPass(int $userId): string
//{
//    //Получаем пароль пользователя из базы данных
//    return '';
//}
//
//function deleteUser(int $userId): bool
//{
//// Удалить пользователя из базы данных
//    return true;
//}
