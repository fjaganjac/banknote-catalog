DROP TABLE IF EXISTS Banknotes;

CREATE TABLE IF NOT EXISTS Banknotes  (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    denominationId INT NOT NULL,
    filename VARCHAR(400) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(65535),
    active boolean DEFAULT true,    
    valid boolean NOT NULL DEFAULT true,    
    dateCreated DATETIME NOT NULL,
    userCreated VARCHAR(100) NOT NULL,
    dateModified DATETIME,    
    userModified VARCHAR(100),
    FOREIGN KEY (denominationId) REFERENCES denominations(id)

)