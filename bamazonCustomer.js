var inquirer = require('inquirer');
var Table = require('cli-table');
var mysql = require('mysql');
var colors = require('colors');

var recordKeeping = [];

var databaseUpdate = [];

var shoppingCart = new Table({
    head: ['Item Id', 'Item Name', 'Price', 'Quantity'],
    colWidths: [25, 30, 25, 15]
});

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
            head: ['Item Id', 'Item Name', 'Price', 'Quantity'],
            colWidths: [25, 30, 25, 15]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (let i = 0; i < res.length; i++) {

            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );

        }

        console.log(table.toString());
        buyItem();
    });


};
//The function to handle the purchasing of items from our database
function buyItem() {

    

    //inquirer will find out what item the customer wants to purchase and how many.
    inquirer.prompt([
        {
            type: 'input',
            name: 'item',
            message: "'Which item would you like to purchase?'"
        },
        {
            type: 'input',
            message: "How many would you like to purchase?",
            name: 'quantity'
        }
    ]).then(function (response) {
        // query our database
        const query = "SELECT * FROM products where item_id = ?";
        connection.query(query, response.item, function (err, res) {
            if (res.length > 0) {
                //check if there is enough quantity of product in stock
                if (response.quantity > res[0].stock_quantity) {
                    console.log('\r\n');
                    console.log("We are unable to fufill your request at this time, please check back later.");
                    setTimeout(function () { buyItem() }, 2000);

                } else {
                    recordKeeping.push(res, parseInt(response.quantity));
                    databaseUpdate.push(res[0].item_id, (parseInt(res[0].stock_quantity) - parseInt(response.quantity)));
                    console.log('\r\n');
                    for (i = 0; i < recordKeeping.length; i += 2) {
                        total += (recordKeeping[i][0].price * recordKeeping[i + 1]);
                    }
                    checkOut();
                }
            }
            else {
                console.log('\r\n');
                console.log('This item is not in our inventory.');
                setTimeout(function () { buyItem() }, 2000);
            }
        })
        let buyQuantity = parseInt(response.quantity);

        // console.log(stock);

    });
};

function checkOut() {
    console.log(recordKeeping);

    inquirer.prompt({
        name: 'choice',
        message: 'What would you like to do now?',
        type: 'list',
        choices: ['Continue-Shopping', 'Proceed-to-Checkout', 'quit']
    }).then(function (response) {
        let run = true;

        switch (response.choice) {
            case 'Continue-Shopping':
                itemForSale();
                break;
            case 'Proceed-to-Checkout':
                for (i = 0; i < databaseUpdate.length; i++) {
                    query2 = 'UPDATE products SET stock_quantity=? WHERE item_id=?';
                    connection.query(query2, [databaseUpdate[i+1], databaseUpdate[i]], function(err,res){})
                }
                console.log("Purchase processed, thank you!");
                run = false;
                break;
            case 'quit':
                run = false;
                break;
        }
        if (run){ purchase()};
    });

};


