DROP TABLE IF EXISTS Currencies;

CREATE TABLE IF NOT EXISTS Currencies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    countryId INT NOT NULL, 
    code varchar(40) NOT NULL UNIQUE,
    name varchar(100) NOT NULL,
    description varchar(4000),
    valid TINYINT NOT NULL DEFAULT 1,
    dateCreated DATETIME NOT NULL,  
    userCreated VARCHAR(100) NOT NULL,
    dateModified DATETIME,
    userModified VARCHAR(100),
    FOREIGN KEY (countryId) REFERENCES Countries(id)
);