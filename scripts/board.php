<?php
require_once 'Product.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['ads_id']) && $_GET['ads_id']) {
        $adsId = (int)$_GET['ads_id'];
        $product = new Product();
        $result = $product->getProduct($adsId);
        if ($result) {
            echo json_encode($result);
        } else {
            echo "Объявление не найдено";
        }
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
        } else {
            echo "Объявления не найдены";
        }
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
    $put = json_decode(file_get_contents("php://input"), true);
    if (isset($put['ads_id']) && ((isset($put['text']) || isset($put['name']) || isset($put['price']) || isset($put['image_id'])))) {
        $adsId = null;
        if ($put['ads_id']) {
            $adsId = (int)$put['ads_id'];
        }
        if ($adsId) {
            $product = new Product();
            $productByAdsId = $product->getProduct($adsId);
        } else {
            echo "Невозможно найти товар";
            exit();
        }
        if (isset($put['user_id']) && (int)$put['user_id'] === (int)$productByAdsId['user_id']) {
            $text = null;
            if (isset($put['text']) && $put['text']) {
                $text = (string)$put['text'];
            }
            $name = null;
            if (isset($put['name']) && $put['name']) {
                $name = (string)$put['name'];
            }
            $price = null;
            if (isset($put['price']) && $put['price']) {
                $price = (int)$put['price'];
            }
            $imageId = null;
            if (isset($put['image_id']) && $put['image_id']) {
                $imageId = (int)$put['image_id'];
            }
            $product->updateAds($adsId, $text, $name, $price, $imageId);
            echo "Товар обновлён";
        } else {
            echo "Редактирование запрещено";
        }
    } else {
        echo "Редактирование запрещено";
    }
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $delete = json_decode(file_get_contents("php://input"), true);
    if (isset($delete['ads_id']) && $delete['ads_id'] && isset($delete['user_id']) && $delete['user_id']) {
        $adsId = (int)$delete['ads_id'];
        if ($adsId) {
            $product = new Product();
            $productByAdsId = $product->getProduct($adsId);
        } else {
            echo "Невозможно найти товар";
            exit();
        }
        if ((int)$delete['user_id'] === (int)$productByAdsId['user_id']) {
            $adsId = (int)$delete['ads_id'];
            $product = new Product();
            $product->deleteAds($adsId);
            echo "Товар удалён";
        } else {
            echo "Товар не удалось удалить";
        }
    } else {
        echo "Объявление не найдено";
    }
}