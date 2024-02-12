const mongoose = require('mongoose');

const dbURI = "mongodb+srv://Ansar:Ansar02012004@cluster0.eotba7o.mongodb.net/";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

module.exports = db;
