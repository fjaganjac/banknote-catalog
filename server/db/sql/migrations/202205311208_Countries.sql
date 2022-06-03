DROP TABLE IF EXISTS Countries;

CREATE TABLE IF NOT EXISTS Countries  (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(40) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(4000),
    valid boolean NOT NULL DEFAULT true,    
    dateCreated DATETIME NOT NULL,
    userCreated VARCHAR(100) NOT NULL,
    dateModified DATETIME,    
    userModified VARCHAR(100)
)