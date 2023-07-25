module.exports = sequelize.define('languageModel', {
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
    Price: {
        type: Sequelize.FLOAT
    },
    KdvID: {
        type: Sequelize.STRING
    },
    Discount: {
        type: Sequelize.FLOAT
    },
    Isdefaultsource: {
        type: Sequelize.BOOLEAN
    },
    Isdefaulttarget: {
        type: Sequelize.BOOLEAN
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
    tableName: 'languages', // replace with the name of your existing table
    timestamps: false
});