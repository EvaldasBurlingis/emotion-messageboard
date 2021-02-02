<?php declare( strict_types = 1 );

class Message
{
    /**
     * Add new message to db
     */
    public static function create(Array $data) : String {
        $sql = sprintf(
            "INSERT INTO %s (%s) VALUES (%s)",
            "messages",
            implode(", ", array_keys($data)),
            ":" . implode(", :", array_keys($data))
        );

        return $sql;
    }

    /**
     * Show all messages
     */
    public static function all() : String {
        return "SELECT * from messages";
    }
}