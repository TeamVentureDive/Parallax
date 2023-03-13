const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../para.db', (error) => {
    if (error) throw error;
    console.log('Connected to SQLite database!');
});

module.exports = {db};