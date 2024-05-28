const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('./nagpur.db');

// Define a route to fetch the latest data
app.get('/latestData', (req, res) => {
    // Query to get the latest data from the table
    const query = 'SELECT logTime FROM log ORDER BY logTime DESC LIMIT 1';

    // Execute the query
    db.get(query, (err, row) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return console.error(err.message);
        }
        
        // Send the retrieved data as JSON response
        res.json({ logTime: row.logTime });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
