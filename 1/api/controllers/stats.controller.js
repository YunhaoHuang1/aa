const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    let result =
        {numberOfContacts: 0, numberOfPhones: 0,newestContact: null, oldestContact: null};
    Contacts.findAll({
        order: [
            ['createdAt', 'ASC']
        ]
    })
        .then(data => {
            result.numberOfContacts = data.length;
            result.oldestContact = data[0].createdAt;
            result.newestContact = data[data.length - 1].createdAt;
            Phones.count().then(count => {
                result.numberOfPhones = count;
                res.send(result);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred"
                });
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    
};