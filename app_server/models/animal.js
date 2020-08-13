const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    zooId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    genus: {
        type: String,
        required: true 
    },
    genusId: {
        type: String,
        min: [3, 'Must be 3 digit number.'],
        max: [3, 'Must be 3 digit number.'],
        required: true
    },
    species: {
        type: String,
        required: true
    },
    speciesId: {
        type: String,
        min: [3, 'Must be 3 digit number.'],
        max: [3, 'Must be 3 digit number.'],
        required: true
    },
    number: {
        type: String,
        min: [3, 'Must be 3 digit number.'],
        max: [3, 'Must be 3 digit number.'],
        required: true
    },
    status: {
        type: String
    }
});

animalSchema.methods.setZooId = function(genusId, speciesId, number) {
    this.zooId = genusId + speciesId + number;
}

module.exports = mongoose.model('animals', animalSchema);