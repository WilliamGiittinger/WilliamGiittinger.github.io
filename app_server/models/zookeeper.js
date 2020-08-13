const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const zookeeperSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true 
    },
    password: {
        type: String,
        required: true
    }
});

zookeeperSchema.methods.passwordCheck = async function(password) {
    var hash = await bcrypt.hash(password, 10);
    return this.password === hash;
}

module.exports = mongoose.model('zookeepers', zookeeperSchema);