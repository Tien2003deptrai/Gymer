const express = require('express');
const sequelize = require('./config/database');
require('./models');
require('./models/User');
const app = express();
require('dotenv').config();
const { UserRoutes } = require('./routes');

const PORT = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello word');
})

app.use('/users', UserRoutes);

sequelize.sync().then(() => {
    console.log('Database connected and synced');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})

