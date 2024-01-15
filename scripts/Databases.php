<?php

class Databases
{
    public static function getAll(string $sql): array
    {
        $connection = self::connectToDB();
        $resultQuery = $connection->query($sql);
        return mysqli_fetch_all($resultQuery, MYSQLI_ASSOC);
    }

    public static function query(string $sql): void
    {
        $connection = self::connectToDB();
        $connection->query($sql);
    }

    private static function connectToDB()
    {
        $mysqli = new mysqli("localhost", "root", "", "board");
        if ($mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
            exit();
        }
        return $mysqli;
    }
}