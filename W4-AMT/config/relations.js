function oneToOneAssociation(table1, table2) {
  table1.hasOne(table2);
  table2.belongsTo(table1);
}

function oneToManyAssociation(table1, table2) {
  table1.hasMany(table2);
  table2.belongsTo(table1);
}

function manyToManyAssociation(tableA, tableB, throughTable){

    tableA.belongsToMany(tableB, {through: throughTable});
    tableB.belongsToMany(tableA, {through: throughTable});
}


module.exports = {
  oneToOneAssociation,
  oneToManyAssociation,
  manyToManyAssociation,
};
