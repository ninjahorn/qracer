const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    score: { type: Number, default: 0 },
    qrcode1000: {type: Boolean, default: false},
    qrcode2000: {type: Boolean, default: false},
    qrcode3000: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
