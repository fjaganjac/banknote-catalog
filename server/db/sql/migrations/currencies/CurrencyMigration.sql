DROP TABLE IF EXISTS Currencies;

CREATE TABLE IF NOT EXISTS Currencies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    country_id INT NOT NULL, 
    code varchar(40) NOT NULL UNIQUE,
    name varchar(100) NOT NULL,
    description varchar(4000),
    valid TINYINT NOT NULL DEFAULT 1,
    date_created DATETIME NOT NULL,  
    user_created VARCHAR(100) NOT NULL,
    date_modified DATETIME,
    user_modified VARCHAR(100),
    FOREIGN KEY (country_id) REFERENCES Countries(id)
);