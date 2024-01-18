<?php
require_once 'Product.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['ads_id']) && $_GET['ads_id']) {
        $adsId = (int)$_GET['ads_id'];
        $product = new Product();
        $result = $product->getProduct($adsId);
        if ($result) {
            echo json_encode($result);
        }
        echo "Объявление не найдено";
    } else if (isset($_GET['offset']) && isset($_GET['limit'])) {
        $offset = (int)$_GET['offset'];
        $limit = (int)$_GET['limit'];
        $userId = null;
        if (isset($_GET['user_id']) && $_GET['user_id']) {
            $userId = (int)$_GET['user_id'];
        }
        $product = new Product();
        $result = $product->getProductList($offset, $limit, $userId);
        if ($result) {
            echo json_encode($result);
        }
        echo "Объявления не найдены";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['text']) && isset($_POST['name']) && isset($_POST['price']) && isset($_POST['user_id'])) {
        $userId = null;
        if ($_POST['user_id']) {
            $userId = (int)$_POST['user_id'];
        }
        $text = null;
        if ($_POST['text']) {
            $text = (string)$_POST['text'];
        }
        $name = null;
        if ($_POST['name']) {
            $name = (string)$_POST['name'];
        }
        $price = null;
        if ($_POST['price']) {
            $price = (int)$_POST['price'];
        }
        $imageId = null;
        if (isset($_POST['image_id']) && $_POST['image_id']) {
            $imageId = (int)$_POST['image_id'];
        }
        if ($userId && $text && $name && $price) {
            $product = new Product();
            $product->addAds($userId, $text, $name, $price, $imageId);
            echo "Товар создан";
        } else {
            echo "Не все поля заполнены";
        }
    } else {
        echo "Не все поля заполнены";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    if (isset($_POST['ads_id']) && ((isset($_POST['text']) || isset($_POST['name']) || isset($_POST['price']) || isset($_POST['image_id'])))) {
        $adsId = null;
        if ($_POST['ads_id']) {
            $adsId = (int)$_POST['ads_id'];
        }
        if ($adsId) {
            $product = new Product();
            $productByAdsId = $product->getProduct($adsId);
        } else {
            echo "Невозможно найти товар";
            exit();
        }
        if (isset($_PUT['user_id']) && $_PUT['user_id'] === $productByAdsId['user_id']) {
            $text = null;
            if (isset($_POST['text']) && $_POST['text']) {
                $text = (string)$_POST['text'];
            }
            $name = null;
            if (isset($_POST['name']) && $_POST['name']) {
                $name = (string)$_POST['name'];
            }
            $price = null;
            if (isset($_POST['price']) && $_POST['price']) {
                $price = (int)$_POST['price'];
            }
            $imageId = null;
            if (isset($_POST['image_id']) && $_POST['image_id']) {
                $imageId = (int)$_POST['image_id'];
            }
            $product->updateAds($adsId, $text, $name, $price, $imageId);
            echo "Товар обновлён";
        }
    } else {
        echo "Редактирование запрещено";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (isset($_DELETE['ads_id']) && $_DELETE['ads_id']) {
        $adsId = (int)$_DELETE['ads_id'];
        $product = new Product();
        $product->deleteAds($adsId);
    } else {
        echo "Объявление не найдено";
    }
}