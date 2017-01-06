create database if not exists orgella;

  use orgella;

  create table if not exists users(UserID int(5) not null auto_increment, Nick varchar(30) not null unique, FirstName varchar(30) not null, LastName varchar(30) not null,Password varchar(32) not null, PasswordSalt varchar(30) not null, Address varchar(30) not null, primary key(UserID));

  create table if not exists offers(OfferID int(5) not null auto_increment, SellerID int(5) not null, ProductName varchar(30) not null, Category varchar(30) not null, Description varchar(100), Price int(5) not null, ProductQuantity int(5) not null, primary key(OfferID), constraint offer_key foreign key (SellerID) references users(UserID) on delete cascade);

  create table if not exists orders(OrderID int(5) not null auto_increment, BuyerID int(5) not null, SellerID int(5) not null, Discount int(5), TotalPrice int(5) not null, primary key(OrderID),  constraint seller_id_key foreign key (SellerID) references users(UserID) on delete cascade, constraint buyer_id_key foreign key (BuyerID) references users(UserID) on delete cascade);

  create table if not exists order_details(ID int(5) not null auto_increment, OrderID int(5) not null, Quantity int(5) not null, OfferID int(5) not null, UnitPrice int(5) not null, ShipmentID int(5) not null, primary key(ID), constraint order_details_key foreign key (OrderID) references orders(OrderID) on delete cascade, constraint order_det foreign key (ShipmentID) references shipment(ShipmentID) on delete cascade);

  create table if not exists comments(CommentID int(5) not null auto_increment, BuyerID int(5) not null, SellerID int(5) not null, PreviousCommentID int(5), FollowingCommentID int(5), OrderID int(5) not null, Content varchar(30), Date datetime not null,primary key(CommentID), constraint comment_seller_id_key foreign key (SellerID) references users(UserID) on delete cascade, constraint comment_buyer_key foreign key (BuyerID) references users(UserID) on delete cascade);

  create table if not exists shipment(ShipmentID int(5) not null, ShipmentName varchar(30) not null, Price int(5) not null, Description varchar(100), MaxInParcel int(5), primary key(ShipmentID));

  create table if not exists administrators(AdminID int(5) not null auto_increment, UserID int(5) not null, constraint user_key foreign key (UserID) references users(UserID) on delete cascade, primary key(AdminID));

  create temporary table if not exists shopping_basket(UserID int(5) not null, OfferID int(5), constraint user_keyy foreign key (UserID) references users(UserID) on delete cascade);

  create table if not exists offer_details(ID int(5) not null auto_increment, OfferID int(5) not null, ShipmentType varchar(30) not null, primary key(ID), constraint offer_details_key foreign key (OfferID) references offers(OfferID) on delete cascade);

  insert into shipment (ShipmentID, ShipmentName, Price) values (0, "PostOffice", 14), (1, "Royal Mail", 20), (2, "DHL", 10), (3, "OrgellaInPost", 2), (4, "United States Postal Service", 12);




insert into users(Nick, FirstName, LastName, Password, PasswordSalt, Address) values ("Nick1", "FirstName1", "LastName1", "Password1", "PasswordSalt1", "Address1"), ("Nick2", "FirstName2", "LastName2", "Password2", "PasswordSalt2", "Address2"), ("Nick3", "FirstName3", "LastName3", "Password3", "PasswordSalt3", "Address3"), ("Nick4", "FirstName4", "LastName4", "Password4", "PasswordSalt4", "Address4");
