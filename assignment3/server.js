const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// ================= MYSQL =================
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected ✅");
    initDB();
});

// ================= INIT DATABASE =================
function initDB() {

    db.query("CREATE DATABASE IF NOT EXISTS hospital_db", (err) => {
        if (err) throw err;

        db.query("USE hospital_db", (err) => {
            if (err) throw err;

            createTables();
        });
    });
}

// ================= TABLES =================
function createTables() {

    db.query(`
        CREATE TABLE IF NOT EXISTS patients (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(100)
        )
    `);

    db.query(`
        CREATE TABLE IF NOT EXISTS doctors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            specialization VARCHAR(100),
            timing VARCHAR(50)
        )
    `);

    db.query(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            patient_email VARCHAR(100),
            doctor_id INT,
            status VARCHAR(50)
        )
    `);

    console.log("Tables Ready ✅");

    insertDoctors();
}

// ================= SAMPLE DOCTORS =================
function insertDoctors() {
    db.query("SELECT * FROM doctors", (err, result) => {

        if (result.length === 0) {

            db.query(`
                INSERT INTO doctors (name, specialization, timing)
                VALUES
                ('Dr. Sharma', 'Cardiologist', '10AM - 2PM'),
                ('Dr. Mehta', 'Dermatologist', '2PM - 6PM'),
                ('Dr. Rao', 'Neurologist', '6PM - 9PM')
            `);

            console.log("Doctors Inserted ✅");
        }
    });
}

// ================= REGISTER =================
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
        return res.send("All fields required ❌");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.send("Invalid email format ❌");
    }

    if (password.length < 4) {
        return res.send("Password too weak ❌");
    }

    db.query(
        "INSERT INTO patients VALUES (NULL,?,?,?)",
        [name, email, password],
        (err) => {
            if (err) return res.send("User already exists ❌");
            res.send("Registered Successfully ✅");
        }
    );
});

// ================= LOGIN =================
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
        return res.json({ success: false });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.json({ success: false });
    }

    db.query(
        "SELECT * FROM patients WHERE email=? AND password=?",
        [email, password],
        (err, result) => {

            if (result.length > 0) {
                res.json({ success: true, email });
            } else {
                res.json({ success: false });
            }
        }
    );
});

// ================= DOCTORS =================
app.get("/doctors", (req, res) => {
    db.query("SELECT * FROM doctors", (err, result) => {
        res.json(result);
    });
});

// ================= BOOK APPOINTMENT =================
app.post("/book", (req, res) => {

    const { email, doctor_id } = req.body;

    db.query(
        "INSERT INTO appointments VALUES (NULL,?,?, 'Pending')",
        [email, doctor_id],
        () => res.send("Appointment Booked ✅")
    );
});

// ================= HOME =================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ================= SERVER START =================
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
