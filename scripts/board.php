<?php
require_once 'Product.php';
if (!session_start()) {
    session_start();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['ads_id']) && $_GET['ads_id']) {
        $adsId = (int)$_GET['ads_id'];
        $product = new Product();
        $result = $product->getProduct($adsId);
        if ($result) {
            echo json_encode(['status' => true, 'result' => $result]);
        } else {
            echo json_encode(['status' => false, 'message' => "Объявление не найдено"]);
        }
    } else if (isset($_GET['offset']) && isset($_GET['limit'])) {
        $offset = (int)$_GET['offset'];
        $limit = (int)$_GET['limit'];
        $userId = null;
        if (!isset($_GET['all']) && isset($_SESSION['user_id']) && $_SESSION['user_id']) {
            $userId = (int)$_SESSION['user_id'];
        }
        $product = new Product();
        $result = $product->getProductList($offset, $limit, $userId);
        if ($result) {
            echo json_encode(['status' => true, 'result' => $result]);
        } else {
            echo json_encode(['status' => false, 'message' => "Объявления не найдены"]);
        }
    }
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['text']) && isset($_POST['name']) && isset($_POST['price'])) {
        $userId = null;
        if (isset($_SESSION['user_id']) && $_SESSION['user_id']) {
            $userId = (int)$_SESSION['user_id'];
        } else {
            echo json_encode(['status' => false, 'message' => "Не удалось определить пользователя"]);
            exit();
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
        $product = null;
        if (isset($_POST['image']) && $_POST['image']) {
            $product = new Product();
            $imageId = (int)$product->upsertImage($_POST['image']);
        }
        if ($userId && $text && $name && $price) {
            if (!$product) {
                $product = new Product();
            }
            $product->addAds($userId, $text, $name, $price, $imageId);
            echo json_encode(['status' => true, 'message' => "Объявление создано"]);
        } else {
            echo json_encode(['status' => false, 'message' => "Не все поля заполнены"]);
        }
    } else {
        echo json_encode(['status' => false, 'message' => "Не все поля заполнены"]);
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
            echo json_encode(['status' => false, 'message' => "Невозможно найти Объявление"]);
            exit();
        }
        if (isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] === (int)$productByAdsId['user_id']) {
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
            $product = new Product();
            if (isset($put['image_id']) && $put['image_id']
                && isset($put['image']) && $put['image']) {
                $imageId = (int)$product->upsertImage($put['image'], $put['image_id']);
            }
            $product->updateAds($adsId, $text, $name, $price, $imageId);
            echo json_encode(['status' => true, 'message' => "Объявление обновлено"]);
        } else {
            echo json_encode(['status' => false, 'message' => "Редактирование запрещено"]);
        }
    } else {
        echo json_encode(['status' => false, 'message' => "Редактирование запрещено"]);
    }
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $delete = json_decode(file_get_contents("php://input"), true);
    if (isset($delete['ads_id']) && $delete['ads_id']) {
        $adsId = (int)$delete['ads_id'];
        if ($adsId) {
            $product = new Product();
            $productByAdsId = $product->getProduct($adsId);
        } else {
            echo json_encode(['status' => false, 'message' => "Невозможно удалить объявление"]);
            exit();
        }
        if ((int)$_SESSION['user_id'] === (int)$productByAdsId['user_id']) {
            $adsId = (int)$delete['ads_id'];
            $product = new Product();
            $product->deleteAds($adsId);
            echo json_encode(['status' => true, 'message' => "Объявление удалено"]);
        } else {
            echo json_encode(['status' => false, 'message' => "Объявление не удалось удалить"]);
        }
    } else {
        echo json_encode(['status' => false, 'message' => "Невозможно удалить объявление"]);
    }
}