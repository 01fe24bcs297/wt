const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors');
const path    = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


// ==========================
// MYSQL CONNECTION
// ==========================

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: ''
});

db.connect((err) => {

    if(err) throw err;

    console.log("MySQL Connected ✅");

    createDatabase();
});


// ==========================
// CREATE DATABASE
// ==========================

function createDatabase() {

    db.query(
        "CREATE DATABASE IF NOT EXISTS food_order",

        (err) => {

            if(err) throw err;

            console.log("Database Ready ✅");

            db.query("USE food_order", (err) => {

                if(err) throw err;

                console.log("Using Database ✅");

                createFoodsTable();
            });
        }
    );
}


// ==========================
// CREATE FOODS TABLE
// ==========================

function createFoodsTable() {

    const sql = `
    CREATE TABLE IF NOT EXISTS foods (

        id INT PRIMARY KEY AUTO_INCREMENT,

        foodName VARCHAR(100),

        category VARCHAR(50),

        price INT,

        restaurantName VARCHAR(100),

        deliveryTime VARCHAR(50)
    )
    `;

    db.query(sql, (err) => {

        if(err) throw err;

        console.log("Foods Table Ready ✅");

        createOrdersTable();
    });
}


// ==========================
// CREATE ORDERS TABLE
// ==========================

function createOrdersTable() {

    const sql = `
    CREATE TABLE IF NOT EXISTS orders (

        id INT PRIMARY KEY AUTO_INCREMENT,

        customerName VARCHAR(100),

        foodName VARCHAR(100),

        restaurantName VARCHAR(100),

        orderStatus VARCHAR(50)
    )
    `;

    db.query(sql, (err) => {

        if(err) throw err;

        console.log("Orders Table Ready ✅");

        createCustomersTable();
    });
}


// ==========================
// CREATE CUSTOMERS TABLE
// ==========================

function createCustomersTable() {

    const sql = `
    CREATE TABLE IF NOT EXISTS customers (

        id INT PRIMARY KEY AUTO_INCREMENT,

        customerName VARCHAR(100),

        password VARCHAR(100),

        email VARCHAR(100),

        phone VARCHAR(20),

        address TEXT
    )
    `;

    db.query(sql, (err) => {

        if(err) throw err;

        console.log("Customers Table Ready ✅");

        insertFoods();
    });
}


// ==========================
// INSERT FOOD ITEMS
// ==========================
function insertFoods() {

    db.query("SELECT * FROM foods", (err, result) => {

        if(err) throw err;

        if(result.length === 0) {

            const sql = `
            INSERT INTO foods
            (foodName, category, price, restaurantName, deliveryTime)

            VALUES

            ('Veg Burger', 'Veg', 120, 'Food Palace', '30 mins'),
            ('French Fries', 'Veg', 80, 'Food Palace', '20 mins'),
            ('Paneer Pizza', 'Veg', 250, 'Food Palace', '35 mins'),

            ('Chicken Pizza', 'Non-Veg', 350, 'Pizza Hub', '45 mins'),
            ('Cheese Pizza', 'Veg', 280, 'Pizza Hub', '40 mins'),
            ('Garlic Bread', 'Veg', 150, 'Pizza Hub', '25 mins'),

            ('Cold Coffee', 'Beverage', 90, 'Cafe Time', '15 mins'),
            ('Cappuccino', 'Beverage', 120, 'Cafe Time', '10 mins'),
            ('Brownie', 'Dessert', 110, 'Cafe Time', '15 mins'),

            ('Paneer Roll', 'Veg', 150, 'Roll Center', '20 mins'),
            ('Chicken Roll', 'Non-Veg', 180, 'Roll Center', '25 mins'),
            ('Veg Momos', 'Veg', 130, 'Roll Center', '20 mins')
            `;

            db.query(sql, (err) => {

                if(err) throw err;

                console.log("Food Items Inserted ✅");
            });
        }
    });
}


// ==========================
// ADD FOOD ITEM
// ==========================

app.post('/addFood', (req, res) => {

    const {

        foodName,
        category,
        price,
        restaurantName,
        deliveryTime

    } = req.body;

    const sql = `
    INSERT INTO foods
    (foodName, category, price, restaurantName, deliveryTime)

    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            foodName,
            category,
            price,
            restaurantName,
            deliveryTime
        ],

        (err) => {

            if(err) throw err;

            res.send("Food Added Successfully ✅");
        }
    );
});
// ==========================
// HOME ROUTE
// ==========================

app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'public', 'login.html')
    );
});


// ==========================
// CUSTOMER REGISTER API
// ==========================

app.post('/register', (req, res) => {

    const {
        customerName,
        password,
        email,
        phone,
        address
    } = req.body;

    const checkSql =
    "SELECT * FROM customers WHERE customerName=?";

    db.query(checkSql, [customerName], (err, result) => {

        if(err) throw err;

        if(result.length > 0) {

            res.send("Customer Already Exists ❌");
        }

        else {

            const sql = `
            INSERT INTO customers
            (customerName, password, email, phone, address)

            VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    customerName,
                    password,
                    email,
                    phone,
                    address
                ],

                (err) => {

                    if(err) throw err;

                    res.send("Registration Successful ✅");
                }
            );
        }
    });
});


// ==========================
// CUSTOMER LOGIN API
// ==========================

app.post('/login', (req, res) => {

    const {
        customerName,
        password
    } = req.body;

    const sql = `
    SELECT * FROM customers
    WHERE customerName=? AND password=?
    `;

    db.query(
        sql,
        [customerName, password],

        (err, result) => {

            if(err) throw err;

            if(result.length > 0) {

                res.json({

                    success: true,

                    message: "Login Successful ✅"
                });
            }

            else {

                res.json({

                    success: false,

                    message: "Invalid Credentials ❌"
                });
            }
        }
    );
});


// ==========================
// GET ALL FOODS
// ==========================

app.get('/foods', (req, res) => {

    db.query(
        "SELECT * FROM foods",

        (err, result) => {

            if(err) throw err;

            res.json(result);
        }
    );
});


// ==========================
// PLACE ORDER
// ==========================

app.post('/placeOrder', (req, res) => {

    const {
        customerName,
        foodName,
        restaurantName
    } = req.body;

    const sql = `
    INSERT INTO orders
    (customerName, foodName, restaurantName, orderStatus)

    VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            customerName,
            foodName,
            restaurantName,
            'Preparing'
        ],

        (err) => {

            if(err) throw err;

            res.send("Order Placed ✅");
        }
    );
});


// ==========================
// GET ALL ORDERS
// ==========================

app.get('/orders', (req, res) => {

    db.query(
        "SELECT * FROM orders",

        (err, result) => {

            if(err) throw err;

            res.json(result);
        }
    );
});


// ==========================
// UPDATE ORDER STATUS
// ==========================

app.put('/updateStatus/:id', (req, res) => {

    const id = req.params.id;

    const { orderStatus } = req.body;

    const sql = `
    UPDATE orders
    SET orderStatus=?
    WHERE id=?
    `;

    db.query(
        sql,
        [orderStatus, id],

        (err) => {

            if(err) throw err;

            res.send("Status Updated ✅");
        }
    );
});


// ==========================
// GET ALL CUSTOMERS
// ==========================

app.get('/customers', (req, res) => {

    db.query(
        "SELECT * FROM customers",

        (err, result) => {

            if(err) throw err;

            res.json(result);
        }
    );
});


// ==========================
// START SERVER
// ==========================

app.listen(3000, () => {

    
    console.log("Server Running ✅");
    console.log("http://localhost:3000");
   
});