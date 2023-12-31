module.exports = sequelize.define('recordtypeModel', {
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
    Ishaveprice: {
        type: Sequelize.BOOLEAN
    },
    Price: {
        type: Sequelize.FLOAT
    },
    Pricetype: {
        type: Sequelize.INTEGER
    },
    GoalID: {
        type: Sequelize.STRING
    },
    Config: {
        type: Sequelize.TEXT
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
    tableName: 'recordtypes', // replace with the name of your existing table
    timestamps: false
});