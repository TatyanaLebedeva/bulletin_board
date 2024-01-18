<?php
require_once 'Databases.php';
class User
{
    public function addUser(string $email, string|int $phone, string $username, string $password): void
    {
        $sql = "INSERT INTO users (email, phone, username, password) VALUES ('$email', '$phone', '$username', '$password')";
        Databases::query($sql);
    }

    public function getUser(int $userId): array|null
    {
        $sql = "SELECT * FROM users WHERE user_id = $userId";
        $res = Databases::getAll($sql);
        if ($res) {
            return $res[0];
        }
        return null;
    }

    public function getUserByEmail(string $email): array|null
    {
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $res = Databases::getAll($sql);
        if ($res) {
            return $res[0];
        }
        return null;
    }

}