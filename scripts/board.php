<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['ads_id'])) {
        echo "Показать объявление ";
    } else if (isset($_GET['offset']) && isset($_GET['limit'])) {
        echo "Показать объявления";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['ads_name']) && isset($_POST['text']) && isset($_POST['price'])) {
        echo "Товар создан";
    } else {
        echo "Не все поля заполнены";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    if (isset($_PUT['ads_id'])) {
        $userIdByAds = getUserByAds((int)$_PUT['ads_id']);
    } else {
        echo "Объявление не найдено";
        exit();
    }
    if (isset($_PUT['user_id']) && $_PUT['user_id'] === $userIdByAds) {
        echo "Редактировать объявление";
    } else {
        echo "Редактирование запрещено";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (isset($_DELETE['ads_id'])) {
        $userIdByAds = getUserByAds((int)$_DELETE['ads_id']);
    } else {
        echo "Объявление не найдено";
        exit();
    }
    if (isset($_DELETE['user_id']) && $_DELETE['user_id'] === $userIdByAds) {
        echo "Удалить объявление";
    } else {
        echo "Удаление запрещено";
    }
}

function getUserByAds(int $adsId): string
{
    $sql = "SELECT user_id FROM ads WHERE ads_id=$adsId";
    //Получаем пользователя, который создал объвление, из базы данных
    return '';
}
