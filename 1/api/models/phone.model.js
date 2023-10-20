module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contactId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
  
    return Phone;
};