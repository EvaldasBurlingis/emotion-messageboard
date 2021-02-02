<?php declare( strict_types = 1 );

namespace App;

use DateTime;

class Helper
{

    /**
     * Get age in years from birthdate
     */
    public static function getAge(String $date)
    {
        $birtdate = new DateTime($date);
        $today = new DateTime('today');
        $age = $birtdate->diff($today)->y;

        return $age;
    }

    /**
     * Sanitize input
    */
    public static function sanitize(String $input)
    {
        return htmlspecialchars($input, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
    }
}