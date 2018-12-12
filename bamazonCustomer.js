var inquirer = require('inquirer');
var Table = require('cli-table');
var mysql = require('mysql');

var recordKeeping = [];

var databaseUpdate = [];

var total = 0;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'

});

connection.connect(function (err) {
    if (err) throw err;

    console.log('Connected as id: ' + connection.threadId);

    itemForSale();
});

function itemForSale() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Item Id', 'Item Name', 'Price', 'Quantity']
            , colWidths: [25, 30, 25, 15]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (let i = 0; i < res.length; i++) {

            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );

        }

        console.log(table.toString());
    });
    

};

function buyItem() {
    inquirer.prompt([
        {
            type: 'input',
            messasge: 'Which item would you like to purchase? (please enter Item ID#)',
            name: 'item'
        }, 
        {
            type: 'input',
            message: "How many would you like to purchase?",
            name: 'quantity'
        }
    ]).then(function(response){
        
    });
}
