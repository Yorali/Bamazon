USE bamazondb;

CREATE TABLE products (
    item_id int(255) not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock int null,
    primary key (item_id)
);