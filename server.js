const express = require('express');
const connectDb = require("./config/dbConnection")

const dotenv = require('dotenv');
const errorHandler= require("./middleware/errorHandler")

dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 3000;  

app.use(express.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler)


// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
