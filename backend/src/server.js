const app = require('./app');
const User = require('./models/userModel');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);

    // Seed admin user after server starts
    User.seedAdmin();

    // Initialize collections table
    const Collection = require('./models/collectionModel');
    Collection.createTable().catch(err => console.error('Error creating collections table:', err));
});

