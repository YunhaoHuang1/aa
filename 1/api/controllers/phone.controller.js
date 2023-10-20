const db = require("../models");
const {where} = require("sequelize");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const contactId = req.params.contactId;
    const {name, number} = req.body;
    Phones.create({
        'name': name,
        'number': number,
        'contactId': contactId
    }).then(phone => {
        res.send(phone);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        })

};

// Get all phones
exports.findAll = (req, res) => {
    const contactId = req.params.contactId;
    Phones.findAll({
        where: {
            contactId: contactId
        }
    }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });

};

// Get one phone by id
exports.findOne = (req, res) => {
    const id = req.params.phoneId;
    Phones.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });

};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.phoneId;
    const {name, number} = req.body;
    Phones.update({
        'name': name,
        'number': number
    },{
        where: {
            id: id
        }
    },{
        returning: true,
    }).then(phone => {
        res.send(phone);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    })

};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;
    Phones.destroy({
        where: {
            id: id
        }
    }).then(phone => {
        res.send("Phone deleted successfully");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    })

};