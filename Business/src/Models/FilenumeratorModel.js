module.exports = sequelize.define('filenumeratorModel', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Current: {
        type: Sequelize.STRING,
    }
}, {
    tableName: 'filenumerators', // replace with the name of your existing table
    timestamps: false
});