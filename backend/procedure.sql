-- stored procedure
CREATE PROCEDURE addUser(IN email VARCHAR(255), IN password VARCHAR(255), IN type VARCHAR(255), IN active TINYINT)
BEGIN
    INSERT INTO users(email, password, type, active) VALUES(email, password, type, active);
END

-- call to stored procedure
CALL addUser("jane@gmail.com", "pass123", "customer", 0);