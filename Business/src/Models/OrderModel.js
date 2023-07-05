module.exports = sequelize.define('orderModel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Orderno: {
        type: Sequelize.STRING,
    },
    RecordtypeID: {
        type: Sequelize.STRING,
    },
    PrinciblecourthauseID: {
        type: Sequelize.STRING,
    },
    PrinciblecourtID: {
        type: Sequelize.STRING,
    },
    Princibleno: {
        type: Sequelize.STRING,
    },
    Desicionno: {
        type: Sequelize.STRING,
    },
    DirectivecourthauseID: {
        type: Sequelize.STRING,
    },
    DirectivecourtID: {
        type: Sequelize.STRING,
    },
    Directiveno: {
        type: Sequelize.STRING,
    },
    Directiveinfo: {
        type: Sequelize.STRING,
    },
    CostumerID: {
        type: Sequelize.STRING,
    },
    CompanyID: {
        type: Sequelize.STRING,
    },
    Registerdate: {
        type: Sequelize.STRING,
    },
    Deliverydate: {
        type: Sequelize.STRING,
    },
    TranslatorID: {
        type: Sequelize.STRING,
    },
    Prepayment: {
        type: Sequelize.FLOAT,
    },
    Notaryexpense: {
        type: Sequelize.FLOAT,
    },
    Netprice: {
        type: Sequelize.FLOAT,
    },
    Calculatedprice: {
        type: Sequelize.FLOAT,
    },
    KdvID: {
        type: Sequelize.STRING,
    },
    PaymentID: {
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