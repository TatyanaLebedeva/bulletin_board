<?php
require_once 'Databases.php';
class User
{
    public function addUser(string $email, string|int $phone, string $username, string $password): void
    {
        $sql = "INSERT INTO users (email, phone, username, password) VALUES ('$email', '$phone', '$username', '$password')";
        Databases::query($sql);
    }
}