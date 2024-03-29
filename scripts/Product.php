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
            $sqlInsert = "WHERE ads.user_id = '$userId'";
        }
        $sql = "SELECT ads_id, text, name, price, ads.image_id, users.username, users.phone, images.description 
                FROM ads 
                JOIN users ON ads.user_id = users.user_id
                LEFT JOIN images ON ads.image_id= images.image_id
                $sqlInsert
                ORDER BY ads_id DESC
                LIMIT $limit
                OFFSET $offset";
        return Databases::getAll($sql);
    }

    public function getProduct(int $adsId): array|null
    {
        $sql = "SELECT * FROM ads WHERE ads_id = '$adsId'";
        $res = Databases::getAll($sql);
        if ($res) {
            return $res[0];
        }
        return null;
    }

    public function upsertImage(string $value, ?int $imageId = null): int|string
    {
        if ($imageId) {
            $sql = "UPDATE images SET description = '$value' WHERE image_id = $imageId";
        } else {
            $sql = "INSERT INTO images (description) values ('$value')";
        }
        return Databases::query($sql);
    }
}
