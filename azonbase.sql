create database bamazondb;

use bamazon;

create table products (
    item_id int(20) not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    primary key (item_id)
);