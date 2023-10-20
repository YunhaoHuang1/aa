const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const { name } = req.body;
    Contacts.create({
        'name': name
    }).then(contact => {
        res.send(contact);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    })
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;
    Contacts.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
  
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;
    const { name } = req.body;
    Contacts.update({
        'name': name
    },{
        where: { id: id }
    },{
        returning: true,
    })
    .then(contact => {
        res.send(contact);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    })
    
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.contactId;
    Contacts.destroy({
        where: { id: id }
    })
    .then(contact => {
        res.send("Contact deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    })
};
