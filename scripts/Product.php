<?php
require_once 'Databases.php';
class Product
{
    public function addAds(int $userId, string $text, string $name, int $price, ?int $imageId = null): void
    {
        if ($imageId) {
            $sql = "INSERT INTO ads (user_id, text, name, price, image_id) VALUES ('$userId', '$text', '$name', '$price', '$imageId')";
        } else {
            $sql = "INSERT INTO ads (user_id, text, name, price) values ('$userId', '$text', '$name', '$price')";
        }
        Databases::query($sql);
    }

    public function deleteAds(int $adsId): void
    {
        $sql = "DELETE FROM ads WHERE ads_id = $adsId";
        Databases::query($sql);
    }

    public function updateAds(int $adsId, ?string $text = null, ?string $name = null, ?int $price = null, ?int $imageId = null): void
    {
        $sqlInsert = '';
        if ($text) {
            $sqlInsert = "text = '$text'";
        }
        if ($name) {
            if ($sqlInsert) {
                $sqlInsert .= ", name = '$name'";
            } else {
                $sqlInsert .= "name = '$name'";
            }
        }
        if ($price) {
            if ($sqlInsert) {
                $sqlInsert .= ", price = '$price'";
            } else {
                $sqlInsert .= "price = '$price'";
            }
        }
        if ($imageId) {
            if ($sqlInsert) {
                $sqlInsert .= ", image_id = '$imageId'";
            } else {
                $sqlInsert .= "image_id = '$imageId'";
            }
        }

        $sql = "UPDATE ads SET $sqlInsert WHERE ads_id = $adsId";
        Databases::query($sql);
    }

    public function getProductList(int $offset, ?int $limit = 4, ?int $userId = null): array
    {
        $sqlInsert = '';
        if ($userId) {
            $sqlInsert = "WHERE user_id = '$userId'";
        }
        $sql = "SELECT * FROM ads $sqlInsert
                ORDER BY ads_id DESC
                LIMIT $limit
                OFFSET $offset";
        return Databases::getAll($sql);
    }
}