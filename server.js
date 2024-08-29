const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicle_rental_system'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/makes', (req, res) => {
    db.query('SELECT DISTINCT make FROM vehicle ORDER BY make ASC', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.get('/models', (req, res) => {
    const make = req.query.make;

    if (!make) {
        return res.status(400).json({ error: 'Make is required' });
    }

    const sql = 'SELECT DISTINCT model FROM vehicle WHERE make = ? ORDER BY model ASC';
    db.query(sql, [make], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        const models = results.map(row => row.model);
        res.json(models);
    });
});

app.get('/years', (req, res) => {
    const make = req.query.make;
    const model = req.query.model;
    const sql = 'SELECT DISTINCT year FROM vehicle WHERE make = ? AND model = ? ORDER BY year ASC';
    db.query(sql, [make, model], (err, results) => {
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length > 0) {
            res.json({ success: true })
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/sign', (req, res) => {
    const { email, password, firstName, lastName, address, phone } = req.body;
    const registrationDate = new Date();

    const values = [firstName, lastName, email, phone, address, password, registrationDate];

    const query = ` INSERT INTO customer (first_name, last_name, email, phone, address, password, registration_date) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true });
    });

});

module.exports = db;