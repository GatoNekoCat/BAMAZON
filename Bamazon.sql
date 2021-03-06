DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    product_kind VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL (4,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('Taco', 'food', 'fast food', 1.99, 10);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('Burgers', 'food', 'fast food', 4.99, 10);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('Coke', 'drinks', 'beverages', 0.99, 100);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('F-35 Lightningh', 'Military Hardware', 'Armory', 3200000000000, 16);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('Mona Lisa ', 'Priceless Art', 'Black Market Art Deals', 60000000, 1);

INSERT INTO products (product_name, product_kind, department_name, price, stock_quantity)
VALUES ('Coke', 'amphetamine', 'Drugs', 200, 100);
