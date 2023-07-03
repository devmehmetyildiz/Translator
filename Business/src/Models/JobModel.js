module.exports = sequelize.define('orderModel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Orderno: {
        type: Sequelize.INTEGER,
    },
    Jobno: {
        type: Sequelize.INTEGER,
    },
    SourcelanguageID: {
        type: Sequelize.STRING,
    },
    TargetlanguageID: {
        type: Sequelize.STRING,
    },
    DocumentID: {
        type: Sequelize.STRING,
    },
    Amount: {
        type: Sequelize.INTEGER,
    },
    Price: {
        type: Sequelize.STRING,
    },
    CaseID: {
        type: Sequelize.STRING,
    },
    Info: {
        type: Sequelize.STRING,
    },
}, {
    tableName: 'orders', // replace with the name of your existing table
    timestamps: false
});