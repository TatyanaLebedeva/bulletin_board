<?php
require_once 'User.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $user = new User();
        $email = (string)$_POST['email'];
        $userByEmail = $user->getUserByEmail($email);
        if ($userByEmail['password'] == $_POST['password']) {
            echo json_encode(['status' => true, 'message' => $userByEmail['user_id']]);
        } else {
            echo json_encode(['status' => false, 'message' => "Не верно указан e-mail или пароль"]);
        }
    } else{
        $message = "Не все поля заполнены";
        echo json_encode(['status' => false, 'message' => $message]);
    }

}