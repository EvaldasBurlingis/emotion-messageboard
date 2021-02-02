<?php declare( strict_types = 1 );

namespace App;

use DateTime;

class Validator
{
    /**
     * Validate fullname
     */
    public static function fullname(String $string)
    {
        $pattern = "/^([a-zA-Z]{3,})+ ([a-zA-Z]{3,})+$/";
        
        if (preg_match($pattern, $string)) return true;
        return false;
    }

    /**
     * Validate email
     */
    public static function email(String $email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Validate datetime
     */
    public static function datetime(String $date, Bool $strict = true)
    {
        $dateTime = DateTime::createFromFormat('Y-m-d', $date);
        if ($strict) {
            $errors = DateTime::getLastErrors();
            if (!empty($errors['warning_count'])) {
                return false;
            }
        }
        return $dateTime !== false;
    }
}    