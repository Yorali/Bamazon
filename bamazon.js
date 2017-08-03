var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazondb'
});

connection.connection(function(err) {
    if (err) throw err;
    console.log("Now connected as " + connection.threadId);
    createProduct();
});

function createProduct() {
    var query = connection.query(
        'insert into products set ?', //everything after ? is first insert
        {
            product_name: 'ESP E-Cygnus',
            department_name: 'music',
            price: 3000,
            stock_qty: 7
        },
        function(err, res) {
            console.log(res.affectedRows + ' product inserted');
        }
    )
}