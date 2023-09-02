module.exports = sequelize.define('definedcostumerModel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Uuid: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    CountryID: {
        type: Sequelize.STRING
    },
    Phone: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    Town: {
        type: Sequelize.STRING
    },
    Address: {
        type: Sequelize.STRING
    },
    Createduser: {
        type: Sequelize.STRING
    },
    Createtime: {
        type: Sequelize.DATE
    },
    Updateduser: {
        type: Sequelize.STRING
    },
    Updatetime: {
        type: Sequelize.DATE
    },
    Deleteduser: {
        type: Sequelize.STRING
    },
    Deletetime: {
        type: Sequelize.DATE
    },
    Isactive: {
        type: Sequelize.BOOLEAN
    }
}, {
    tableName: 'definedcostumers', // replace with the name of your existing table
    timestamps: false
});