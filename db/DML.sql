DELETE FROM shop.users;
DELETE FROM shop.products;
DELETE FROM shop.orders_products;
DELETE FROM shop.carts;
DELETE FROM shop.product_types;


-- Users
INSERT INTO shop.users(
	user_id, name, password)
	VALUES (1, 'batel malkiel', '1234');
INSERT INTO shop.users(
	user_id, name, password)
	VALUES (2, 'amit mash', '1234');
INSERT INTO shop.users(
	user_id, name, password)
	VALUES (3, 'dana dana', '1234');
INSERT INTO shop.users(
	user_id, name, password)
	VALUES (4, 'wowwy', '1234');
INSERT INTO shop.users(
	user_id, name, password)
	VALUES (5, 'lola banny', '1234');