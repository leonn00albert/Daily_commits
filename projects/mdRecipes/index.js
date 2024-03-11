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
    content TEXT,
    category TEXT
)`);


db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name
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
        
        db.all('SELECT * FROM categories', (err, categories) => {
            if (err) {
                console.error('Error getting categories:', err);
                res.sendStatus(500);
                return;
            }

            const result = {};
            recipes.forEach(r => {
                if (!result[r.category]) {
                    result[r.category] = [];
                }
                result[r.category].push(r);
            });
     
            res.render('index', { recipes: result, categories: categories });
        });
    });
});

app.get('/recipes/:id', (req, res) => {

    const recipeId = req.params.id
    db.all('SELECT * FROM recipes WHERE id = ? LIMIT 1', [recipeId], (err, recipe) => {
        if (err) {
            console.error('Error getting recipe:', err);
            return;
        }
        recipe = recipe[0];
        res.render('recipes/view', { recipe});
    });
});




app.post('/save', (req, res) => {
    const { recipe, category } = req.body;
    if (recipe) {
        db.run('INSERT INTO recipes (title, content, category) VALUES (?, ?, ?)', ['New Recipe', recipe, category], (err) => {
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

app.post('/categories', (req, res) => {
    const { name } = req.body;
    if (name) {
        db.run('INSERT INTO categories (name) VALUES (?)', [name], (err) => {
            if (err) {
                console.error('Error saving category:', err);
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
