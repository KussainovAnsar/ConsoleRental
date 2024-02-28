const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    surname: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    deletionDate: { type: Date },
    isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const count = await mongoose.model('User').countDocuments();
        this.userId = count + 1;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
