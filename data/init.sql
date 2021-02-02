CREATE DATABASE message_board;

use message_board;

-- Create tables

CREATE TABLE messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    birthdate DATETIME NOT NULL,
    email VARCHAR(50),
    message TEXT NOT NULL
);


-- Seed database tables

INSERT INTO messages (created_at, fullname, birthdate, email, message)  
    VALUES ('2020-12-05 12:39:16', 'Petras Petrauskas', '1991-08-13', '', 'Sveiki, kaip gyvenate'),
        ('2020-12-05 12:40:16', 'Ignas Ignauskas', '1964-04-12', 'ignas@mail.com', 'Labas, neblogai, kaip tu?'),
        ('2020-12-05 12:41:16', 'Mingaile Mindd', '1987-08-02', 'mingaile@mail.com', 'Spam Spam Spam'),
        ('2020-12-05 12:41:36', 'Ignas Ignauskas', '1964-04-12', '', 'Labas, neblogai, kaip tu?'),
        ('2020-12-05 12:41:46', 'Mingaile Mindd', '1987-08-02', 'mingaile@mail.com', 'Date of birth must be correctly formatted, the existing date'),
        ('2020-12-05 12:42:26', 'Ignas Ignauskas', '1964-04-12', 'ignas@mail.com', 'All form fields must be validated, even if the field is optional, but contains some input from use'),
        ('2020-12-05 12:43:11', 'Mingaile Mindd', '1987-08-02', 'mingaile@mail.com', 'Spam Spam Spam'),
        ('2020-12-05 12:44:16', 'Mingaile Mindd', '1987-08-02', '', 'Spam Spam Spam'),
        ('2020-12-05 12:45:16', 'Ignas Ignauskas', '1964-04-12', 'ignas@mail.com', 'Labas, neblogai, kaip tu?'),
        ('2020-12-05 12:46:16', 'Mingaile Mindd', '1987-08-02', 'mingaile@mail.com', 'Spam Spam Spam'),
        ('2020-12-05 12:47:16', 'Ignas Ignauskas', '1964-04-12', 'ignas@mail.com', 'Labas, neblogai, kaip tu?'),
        ('2020-12-05 12:48:16', 'Mingaile Mindd', '1987-08-02', 'mingaile@mail.com', 'Spam Spam Spam');