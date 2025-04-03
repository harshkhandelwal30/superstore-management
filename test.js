// server.js
const express = require('express');
const oracledb = require('oracledb');
const app = express();
// const PORT = process.env.PORT || 5000;

// Oracle DB Connection Config
const dbConfig = {
    user          : "system",
    password      : "harsh123",
    connectString : ""
};

// Create Connection Pool
async function init() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("Connection Pool created!");
    } catch (err) {
        console.error("Error: ", err);
    }
}

init();

// Query Endpoint
app.get('/api/data', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection();
        const result = await connection.execute(
            `SELECT * FROM your_table`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
