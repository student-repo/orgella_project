create database if not exists orgella2;

use orgella2;

-- InnoDB storage engine is
DROP TABLE users;
DROP TABLE orders;
DROP TABLE order_details;
DROP TABLE comments;
DROP TABLE shipments;
DROP TABLE administrators;
DROP TABLE offers;
DROP TABLE users;


CREATE TABLE IF NOT EXISTS users (
    UserID INT(5) NOT NULL AUTO_INCREMENT,
    Nick VARCHAR(30) NOT NULL,
    FirstName VARCHAR(30) NOT NULL,
    LastName VARCHAR(30) NOT NULL,
    Password VARCHAR(32) NOT NULL,
    PasswordSalt VARCHAR(30) NOT NULL,
    Address VARCHAR(30) NOT NULL,
    PRIMARY KEY (UserID)
);

DROP TABLE IF EXISTS offers;
  CREATE TABLE IF NOT EXISTS offers (
    OfferID INT(5) NOT NULL AUTO_INCREMENT,
    SellerID INT(5) NOT NULL,
    ProductName VARCHAR(30) NOT NULL,
    Category VARCHAR(30) NOT NULL,
    Description VARCHAR(100),
    Price INT(5) NOT NULL,
    ProductQuantity INT(5) NOT NULL,
    PRIMARY KEY (OfferID),
    CONSTRAINT offer_key FOREIGN KEY (SellerID)
        REFERENCES users (UserID)
        ON DELETE CASCADE
);
DROP TABLE IF EXISTS orders;
  CREATE TABLE IF NOT EXISTS orders (
    OrderID INT(5) NOT NULL AUTO_INCREMENT,
    BuyerID INT(5) NOT NULL,
    SellerID INT(5) NOT NULL,
    Discount INT(5),
    TotalPrice INT(5) NOT NULL,
    PRIMARY KEY (OrderID),
    CONSTRAINT seller_id_key FOREIGN KEY (SellerID)
        REFERENCES users (UserID)
        ON DELETE CASCADE,
    CONSTRAINT buyer_id_key FOREIGN KEY (BuyerID)
        REFERENCES users (UserID)
        ON DELETE CASCADE
);

  CREATE TABLE IF NOT EXISTS order_details (
    ID INT(5) NOT NULL AUTO_INCREMENT,
    OrderID INT(5) NOT NULL,
    Quantity INT(5) NOT NULL,
    OfferID INT(5) NOT NULL,
    UnitPrice INT(5) NOT NULL,
    ShipmentID INT(5) NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT order_details_key FOREIGN KEY (OrderID)
        REFERENCES orders (OrderID)
        ON DELETE CASCADE
);
DROP TABLE IF EXISTS comments;
  CREATE TABLE IF NOT EXISTS comments (
    CommentID INT(5) NOT NULL AUTO_INCREMENT,
    BuyerID INT(5) NOT NULL,
    SellerID INT(5) NOT NULL,
    PreviousCommentID INT(5),
    FollowingCommentID INT(5),
    OrderID INT(5) NOT NULL,
    Content VARCHAR(30),
    Date DATETIME NOT NULL,
    primary key(CommentID),
    CONSTRAINT comment_seller_id_key FOREIGN KEY (SellerID)
        REFERENCES users (UserID)
        ON DELETE CASCADE,
    CONSTRAINT comment_buyer_key FOREIGN KEY (BuyerID)
        REFERENCES users (UserID)
        ON DELETE CASCADE
);
--DROP TABLE IF EXISTS shipments;
--  CREATE TABLE IF NOT EXISTS shipments (
--    ShipmentID INT(5) NOT NULL,
--    ShipmentName VARCHAR(30) NOT NULL,
--    Price INT(5) NOT NULL,
--    Description VARCHAR(100),
--    MaxInParcel INT(5) NOT NULL,
--    PRIMARY KEY(ShipmentID)
--);

DROP TABLE IF EXISTS shipments;
  CREATE TABLE IF NOT EXISTS shipments (
    ShipmentID INT(5) NOT NULL AUTO_INCREMENT,
    ShipmentName VARCHAR(30) NOT NULL,
    Price INT(5) NOT NULL,
    Description VARCHAR(100),
    MaxInParcel INT(5) NOT NULL,
    PRIMARY KEY(ShipmentID)
);



DROP TABLE IF EXISTS offer_details;
CREATE TABLE IF NOT EXISTS offer_details(
    ID INT(5) NOT NULL AUTO_INCREMENT,
    OfferID INT(5) NOT NULL,
     ShipmentID INT(5) NOT NULL,
      PRIMARY KEY(ID),
      CONSTRAINT offer_details_key FOREIGN KEY (OfferID)
      REFERENCES offers(OfferID) ON DELETE CASCADE,
      CONSTRAINT ShipmentID_key FOREIGN KEY (ShipmentID)
            REFERENCES shipments(ShipmentID) ON DELETE CASCADE);


-- administratorów będziemy dodawać ręcznie
  CREATE TABLE IF NOT EXISTS administrators (
    AdminID INT(5) NOT NULL AUTO_INCREMENT,
    UserID INT(5) NOT NULL,
    CONSTRAINT user_key FOREIGN KEY (UserID)
        REFERENCES users (UserID)
        ON DELETE CASCADE,
    PRIMARY KEY (AdminID)
);

create temporary table if not exists shopping_basket(UserID int(5) not null, OfferID int(5));




DELIMITER $$
-- przed insertem zmniejsz w ofercie ilosc produktu na stanie
-- jeżeli jest równa zero usuwamy oferte
DROP TRIGGER IF EXISTS after_order_details_insert$$
CREATE TRIGGER after_order_details_insert
    AFTER INSERT ON order_details FOR EACH ROW
    BEGIN
		UPDATE offers o SET o.ProductQuantity = o.ProductQuantity - NEW.Quantity WHERE NEW.OfferID=o.OfferID;
        IF ( SELECT o.ProductQuantity FROM offers o WHERE NEW.OfferID=o.OfferID ) = 0 THEN
		 DELETE FROM offers WHERE offers.OfferID=NEW.OfferID;
		 END IF;
    END$$


DELIMITER ;

DELIMITER $$

-- dodaje zamówienie, obliczając cene produku, używa transakcji
DROP PROCEDURE IF EXISTS addOrder$$
CREATE PROCEDURE addOrder( BuyerNick VARCHAR(30), SellerNick VARCHAR(30), OfferID INT(5), Discount INT(5), Description VARCHAR(100), Quantity INT(5), ShipmentID INT(5))
BEGIN

	DECLARE BuyerID INT(5);
    DECLARE SellerID INT(5);
    DECLARE TotalPrice INT(5);
    DECLARE PackNO INT(5);
    DECLARE UnitPrice INT(5);

    SET BuyerID = (SELECT UserID FROM users WHERE Nick = BuyerNick);
    SET SellerID = (SELECT UserID FROM users WHERE Nick = SellerNick);
    SET PackNO = (CEILING((SELECT MaxInParcel FROM shipments s WHERE s.OfferID = OfferID AND s.ShipmentID = ShipmentID LIMIT 1)/Quantity));
    SET UnitPrice = (SELECT Price FROM offers WHERE offers.OfferID = OfferID);
    SET TotalPrice = ( UnitPrice*Discount + PackNO * (SELECT Price FROM Shipments s WHERE s.OfferID = OfferID AND s.ShipmentID = ShipmentID LIMIT 1) );

    BEGIN

	DECLARE exit handler for sqlexception
    BEGIN
		SELECT "ERROR";
	  ROLLBACK;
	  END;

	DECLARE exit handler for sqlwarning
	 BEGIN
		SELECT "WARNING";
	 ROLLBACK;
	 END;


	START TRANSACTION;

	INSERT INTO orders(BuyerID, SellerID, Discount, TotalPrice) VALUE (BuyerID, SellerID, Discount, TotalPrice);
	INSERT INTO order_details(OrderID, Quantity, OfferID, UnitPrice, ShipmentID) VALUE ((SELECT LAST_INSERT_ID()), Quantity, OfferID, UnitPrice, ShipmentID );

	IF (SELECT ProductQuantity FROM offers WHERE OfferID=offers.OfferID) < 0 THEN
		SELECT "ERROR";
		ROLLBACK;
	ELSE
		COMMIT;
        SELECT "OK";
	END IF;

    END;

END $$
-- dodaj nową oferte
DROP PROCEDURE IF EXISTS addOffer$$
CREATE PROCEDURE addOffer( Nick VARCHAR(30), ProductName VARCHAR(30), Category VARCHAR(30), Description VARCHAR(100),
Price INT(5), ProductQuantity INT(5) )
BEGIN
	INSERT INTO offers(SellerID, ProductName, Category, Description, Price, ProductQuantity) VALUE((SELECT UserID from Users u WHERE u.Nick = Nick ), ProductName, Category, Description, Price, ProductQuantity);
END $$

-- dodaj do tej oferty rodzaj wysyłki
-- to mamy zmienić
DROP PROCEDURE IF EXISTS addShipment$$
CREATE PROCEDURE addShipment( OfferID INT(5), ShipmentID INT(5), ShipmentPrice INT(5), ShipmentDescription VARCHAR(100), MaxInParcel INT(5))
BEGIN
	INSERT INTO offers(SellerID, ProductName, Category, Description, Price, ProductQuantity) VALUE((SELECT UserID from Users u WHERE u.Nick = Nick ), ProductName, Category, Description, Price, ProductQuantity);
    INSERT INTO shipments VALUE( (SELECT UserID from Users u WHERE u.Nick = Nick ), ShipmentID, ShipmentPrice, ShipmentDescription, MaxInParcel);
END $$


-- przeklej swój kod tutaj do przeszukiwania ofert
DROP PROCEDURE IF EXISTS searchOffers$$
CREATE PROCEDURE searchOffers()
BEGIN

END $$

-- wyszukiwanie w komentarzach, powinno zwracać id każdego komentarza gdzie jest wyszukiwany dany pattern
-- tutaj pojawiają się problemy z konceptem rozdzieleinia komentarzy na części, ciężko wyszukać i ogarnąć wszystko
DROP PROCEDURE IF EXISTS searchComments$$
CREATE PROCEDURE searchComments()
BEGIN

END $$

-- dodaj komentarz, pierwsza jego część PreviousComment musi miec wartosc 0, kazda następna musi miec id poprzedniego komentarza
-- zwraca id czesci komentarza który był wstawiony, będzie użyty w następnej części jako PreviousCommentID
DROP FUNCTION IF EXISTS addComment$$
CREATE FUNCTION addComment( BuyerID INT(5), SellerID INT(5), OrderID INT(5), Content VARCHAR(30), PreviousCommentID INT(5)) RETURNS INT
BEGIN
	INSERT INTO comments(BuyerID, SellerID, PreviousCommentID, FollowingCommentID, OrderID, Content, Date) VALUE (BuyerID, SellerID, PreviousCommentID, 0, OrderID, Content, NOW());
    IF(PreviousCommentID != 0) THEN
		UPDATE comments SET FollowingCommentID=LAST_INSERT_ID() WHERE PreviousCommentID=CommentID;
	END IF;
    RETURN LAST_INSERT_ID();
END $$

select  addComment( 1, 1, 1, "Gandalf szary ", 0)$$
select addComment( 1, 1, 1, "Gandalf szary ", 3)$$
SELECT * FROM comments$$
-- zahashowane hasło, sól użyta w hashowaniu
-- użyto transakcji
DROP PROCEDURE IF EXISTS addUser$$
CREATE PROCEDURE addUser( Nick VARCHAR(30), FirstName VARCHAR(30), LastName VARCHAR(30), Password VARCHAR(32), PasswordSalt VARCHAR(30), Address VARCHAR(30))
BEGIN
	DECLARE exit handler for sqlexception
	  BEGIN
		SELECT "ERROR";
	  ROLLBACK;
	END;

	DECLARE exit handler for sqlwarning
	 BEGIN
		SELECT "WARNING";
	 ROLLBACK;
	END;
	START TRANSACTION;
        IF NOT EXISTS (SELECT * FROM users WHERE users.Nick = Nick) THEN
			INSERT INTO users(Nick, FirstName, LastName, Password, PasswordSalt, Address) value (Nick, FirstName, LastName, Password, PasswordSalt, Address);
			SELECT "OK";
		ELSE
			SELECT "ERROR";
        END IF;
	COMMIT;
END $$
-- zahashowane hasło, należy pobrać najpierw sól z serwera
DROP FUNCTION IF EXISTS login $$
CREATE FUNCTION login (Nick VARCHAR(30), Password VARCHAR(32)) RETURNS BOOL
BEGIN
    DECLARE bExists BOOL;
    SET bExists = 0;
    SELECT EXISTS(SELECT * FROM users u WHERE u.Nick=Nick AND u.Password = Password ) INTO bExists ;
    RETURN bExists;
END $$

DELIMITER ;

SELECT addComment( 1, 1, 1, "Gandalf biały ", 0);
CALL addComment( 1, 1, 1, "Gandalf szary ", 4);


SELECT * FROM comments;
SELECT login("blah", "hex");

INSERT INTO users VALUE(1,'blah', 'Tom', 'Mal', 'hex', 'tech', 'hahah');

CALL addOffer('blah', 'prod', 'cat', 'desc', 11, 10, 'kupa', 4, 'ugabufa', 10);

CALL addOrder('blah', 'blah', 1, 1, 'd', 2, 'kupa');

SELECT * from order_details;
SELECT * FROM offers;

--INSERT INTO shipments(ShipmentID, ShipmentName, Price, MaxInParcel)
--VALUES (0, "PostOffice", 14, 5), (1, "Royal Mail", 20, 8), (2, "DHL", 10, 10), (3, "OrgellaInPost", 2, 6), (4, "United States Postal Service", 12, 3);

INSERT INTO shipments(ShipmentName, Price, MaxInParcel)
VALUES ("PostOffice", 14, 5), ("Royal Mail", 20, 8), ("DHL", 10, 10), ("OrgellaInPost", 2, 6), ("United States Postal Service", 12, 3);








