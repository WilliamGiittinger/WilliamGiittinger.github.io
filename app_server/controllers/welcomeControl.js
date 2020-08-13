/* GET welcome landing page */
const request = require('request');
const mongoose = require('mongoose');
const Animals = require('../models/animal');
const { BinaryTree } = require('../dataServices/binaryTree');

/* Global declarations */
var BST = new BinaryTree();
var root = null;
var orderedAnimalsDB = [];
var orderedAnimalsBST = [];
var dbPage = 0;          

/* Render welcome page */
const welcomeDisplay = (req, res) => {
    res.render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
};

/* Retrieve list of animals from MongoDB,
   insert each into BST and display tree on welcome page. */
const initializeBST = async (req, res) => {
    if (BST.getRootNode() !== null) {
        BST = new BinaryTree();
    }
    try {
        await Animals.find({}, '-_id -__v', function(err, docs) {
            if (err) {
                console.log(err);
                req.flash('bstLoadMsg', 'Failed to initialize Binary Search Tree');
                return res
                    .status(500)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            } else if (docs.length <= 0) {
                req.flash('bstLoadMsg', 'No animals to place in Binary Search Tree');
                return res
                    .status(200)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            } else {
                for (var i = 0; i < docs.length; i++) {
                    BST.insert(docs[i]);
                };
                req.flash('bstLoadMsg', 'Binary Search Tree initialized with data from MongoDB.');
                res
                    .status(200)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            }
        });
    } catch (err) {
        console.log(err);
    }
}


/* ---DISPLAY METHODS--- */

/* Display entire BinaryTree on Welcome page */
const displayBST = (req, res) => {
    if (BST.getRootNode() === null) {
        req.flash('bstDisplayMsg', 'No animals are currently loaded into Binary Search Tree.');
        return res
            .status(404)
            .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
    } else {
        root = BST.getRootNode();
        BST.inOrder(root);
        orderedAnimalsBST = BST.orderedList;
        res
            .status(200)
            .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST })
    }
    BST.clearOrderedList();
}

/* Retrieve list of 10 animals from MongoDB,
   and render welcome page with the list. */
const displayDB = async (req, res) => {
    dbPage = Math.abs(req.body.pageNum - 1);
    try {
        var list = await Animals.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                return res
                        .status(500)
                        .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            }
        }).skip(dbPage*10).limit(10);       // Display only 10 at a time
        orderedAnimalsDB = list;
        if (orderedAnimalsDB.length <= 0) {
            req.flash('dbDisplayMsg', 'No animals found on this page.');
        }
        res
            .status(200)
            .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
    } catch (err) {
        console.log(err);
    };
};


/* ---REMOVE METHODS--- */


/* Removes animal from BinarySearchTree */
const removeBST = (req, res) => {
    try {
        BST.remove(req.body.animalToRemove);
        req.flash('bstRemoveMsg', 'Process executed successfully.');
        res
            .status(200)
            .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
    } catch (err) {
        console.log(err);
    };
};

/* Removes animal from MongoDB */
const removeDB = (req, res) => {
    try {
        var result = Animals.deleteOne({ zooId: req.body.animalToRemove }, function (err) {
            if (err) {
                console.log(err);
                req.flash('insertMsg', 'No animal found with that ID.');
                return res
                        .status(500)
                        .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            } else {
                req.flash('dbRemoveMsg', 'Animal successfully removed.');
                res
                    .status(200)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            }
        })
    } catch (err) {
        console.log(err);
    };
};


/* ---INSERT METHODS--- */


/* Inserts animal into DB.
   First creates instance of animal and searches
   for animal with that id already in system. */
const insertDB = (req, res) => {
    if (!req.body.insertGenusId || !req.body.insertSpeciesId || !req.body.insertNumber) {
        req.flash('insertMsg', 'Insert all required fields.');
        res
            .status(400)
            .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
    }
    try {
        var newAnimal = new Animals({
            _id: new mongoose.Types.ObjectId(),
            zooId: req.body.insertGenusId + req.body.insertSpeciesId + req.body.insertNumber,
            name: req.body.insertName,
            genus: req.body.insertGenus,
            genusId: req.body.insertGenusId,
            species: req.body.insertSpecies,
            speciesId: req.body.insertSpeciesId,
            number: req.body.insertNumber,
            status: req.body.insertStatus
        });

        newAnimal.save()
            .then(result => {
                req.flash('insertMsg', 'Success!')
                res
                    .status(201)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            })
            .catch(err => {
                req.flash('insertMsg', 'Animal with that ID already exists.');
                res
                    .status(400)
                    .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
            });
    } catch (err) {
        console.log(err);
    };
}

/* Inserts animal into BinaryTree.
   First creates instance of animal and searches
   for animal with that id already in system. */
const insertBST = (req, res) => {
    try {
        var newAnimal = {
            zooId: req.body.insertGenusId + req.body.insertSpeciesId + req.body.insertNumber,
            name: req.body.insertName,
            genus: req.body.insertGenus,
            genusId: req.body.insertGenusId,
            species: req.body.insertSpecies,
            speciesId: req.body.insertSpeciesId,
            number: req.body.insertNumber,
            status: req.body.insertStatus
        };
        var result = BST.search(root, newAnimal.zooId);
        if (result === false) {
            req.flash('insertMsg2', 'Animal with that ID already exists.');
            res
                .status(400)
                .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
        } else {
            BST.insert(newAnimal);
            req.flash('insertMsg2', 'Success!');
            res
                .status(400)
                .render('welcome', { user: req.user.name, orderedAnimalsDB: orderedAnimalsDB, orderedAnimalsBST: orderedAnimalsBST });
        }
    } catch (err) {
        console.log(err);
    };
}


module.exports = {
    welcomeDisplay,
    initializeBST,
    displayBST,
    displayDB,
    removeBST,
    removeDB,
    insertDB,
    insertBST
};