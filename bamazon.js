var mysql = require('mysql');
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazondb'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Now connected as " + connection.threadId);
    createProduct();
    gochuumon();
});

function gochuumon() {
    inquirer.prompt([
        {
            type:'input',
            message: "Which guitar would you like?",
            name: 'guitar'
        },
        {
            type: 'input',
            message: 'How many?',
            name: 'amount'
        }
    ]).then(function(inquirerResponse) {
        var query = "SELECT stock FROM products WHERE item_id = '" + inquirerResponse.guitar +"'";
        connection.query(query, function(err, res) {
            if (res[0].stock < inquirerResponse.amount) {
                console.log("Apologies, we do not carry that many at this moment.");
                inventory();
                gochuumon();
            } else {
                var query = "UPDATE products SET stock = " + (res[0].stock - inquirerResponse.amount) +
                " WHERE item_id = '" + inquirerResponse.id + "'";
                connection.query(query, function(err, res) {
                    if (err) throw err; 
                     //   console.log("The price is " + (res[0].price * inquirerResponse.amount));
                        updateStock();
                        inventory();
                        gochuumon();
                    
                });
            };
        });
    });
};

function inventory() {
    var query = connection.query("SELECT * FROM products", 
    function(err, res) {
        console.log(res);
    })
    console.log(query.sql + 'wwwwww');
};

function updateStock(field, value, idNo) {
    var query = "UPDATE products set ? WHERE ?";
    connection.query(query, [
        {
            field: value
        },
        {
            id: idNo
        }
    ], function(err, res) {
        console.log("Updated");
    })
};

function createProduct() {
    var query = connection.query(
        'INSERT INTO products (product_name, department_name, price, stock) VALUES ?', //everything after ? is first insert
        [
            {
                product_name: 'ESP E-Cygnus',
                department_name: 'musical instruments',
                price: 3000,
                stock: 3
            },
            {
                product_name: 'ESP Crying Star Classic',
                department_name: 'musical instruments',
                price: 5000,
                stock: 5
            },
            {
                product_name: 'Ibanez TAM-100',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'ESP Horizon',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'ESP Crying Star E-130',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'Strandberg 8-String',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'Strandberg 7-String',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'Strandberg 6-string',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'Ibanez TAM-100',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            },
            {
                product_name: 'Ibanez TAM-100',
                department_name: 'musical instruments',
                price: 4800,
                stock: 8
            }
        ],
        function(err, res) {
            updateProduct();
        }
    )
    console.log(query.sql);
};

function updateProduct() {
    var query = connection.query(
        'update products set ? where ?',
        [
            {
                quantity: 500
            },
            {
                id: 7
            }
        ],
        function(err, res) {
            console.log(res)
        }
    );
};