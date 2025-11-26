DROP TABLE IF EXISTS shop.users;
DROP TABLE IF EXISTS shop.products;
DROP TABLE IF EXISTS shop.orders_products;
DROP TABLE IF EXISTS shop.carts;
DROP TABLE IF EXISTS shop.product_types;


CREATE SCHEMA IF NOT EXISTS shop;

ALTER SCHEMA shop OWNER TO postgres;

CREATE TABLE shop.users (
	user_id     INTEGER PRIMARY KEY,
	name   TEXT,
	password      TEXT,		
);

CREATE TABLE shop.products (
	product_id     INTEGER PRIMARY KEY,
	name   TEXT,
	description    TEXT,
	price       INTEGER,
	type_id    INTEGER REFERENCES TO shop.product_types(type_id)
);

CREATE TABLE shop.orders_products (
	order_id     INTEGER PRIMARY KEY,
	product_id  INTEGER,
    quantity    INTEGER NOT NULL DEFAULT 1,
);

CREATE TABLE shop.carts (
	user_id     INTEGER PRIMARY KEY,
	product_id  INTEGER,
    quantity    INTEGER NOT NULL DEFAULT 1,
);

CREATE TABLE shop.product_types (
	type_id INTEGER PRIMARY KEY,
	name  TEXT
);
