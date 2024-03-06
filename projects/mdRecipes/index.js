const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

const db = new sqlite3.Database('recipes.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
)`);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public'), {
    extensions: ['js', 'css']
}));
app.get('/', (req, res) => {
    db.all('SELECT * FROM recipes', (err, recipes) => {
        if (err) {
            console.error('Error getting recipes:', err);
            res.sendStatus(500);
            return;
        }
        res.render('index', { recipes });
    });
});

app.post('/save', (req, res) => {
    const { recipe } = req.body;
    if (recipe) {
        db.run('INSERT INTO recipes (title, content) VALUES (?, ?)', ['New Recipe', recipe], (err) => {
            if (err) {
                console.error('Error saving recipe:', err);
                res.sendStatus(500);
                return;
            }
            res.redirect('/');
        });
    } else {
        res.sendStatus(400);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
