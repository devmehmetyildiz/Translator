module.exports = sequelize.define('jobModel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Uuid: {
        type: Sequelize.STRING
    },
    Order: {
        type: Sequelize.INTEGER
    },
    OrderID: {
        type: Sequelize.STRING,
    },
    Jobno: {
        type: Sequelize.STRING,
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
        type: Sequelize.FLOAT,
    },
    CaseID: {
        type: Sequelize.STRING,
    },
    Info: {
        type: Sequelize.STRING,
    },
    Wordcount: {
        type: Sequelize.INTEGER,
    },
    Linecount: {
        type: Sequelize.INTEGER,
    },
    Charcount: {
        type: Sequelize.INTEGER,
    },
    Calculatedprice: {
        type: Sequelize.FLOAT,
    },
    Calculatedamount: {
        type: Sequelize.INTEGER,
    },
    Preferredprice: {
        type: Sequelize.FLOAT,
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
    tableName: 'jobs', // replace with the name of your existing table
    timestamps: false
});