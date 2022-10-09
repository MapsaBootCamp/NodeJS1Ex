const { Sequelize, DataTypes } = require('sequelize');
const { oneToManyAssociation, manyToManyAssociation } = require('./relations');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quezDB.sqlite',
    logQueryParameters: true
});


const modelDefiners = [
    require('./models/user'),
    require('./models/Question'),
    require('./models/azmon')
];

for(const modelFunction of modelDefiners){
    modelFunction(sequelize)
};

oneToManyAssociation(sequelize.models.User, sequelize.models.azmon);
manyToManyAssociation(sequelize.models.Question,sequelize.models.azmon, 'azmon_item' );




module.exports = sequelize;