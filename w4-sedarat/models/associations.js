

export function oneToManyRelation(tableA, tableB){
    tableA.hasMany(tableB);
    tableB.belongsTo(tableA);
}

export function superManyToManyRelation(tableA, tableB, tableC){
    tableA.belongsToMany(tableB, { through: tableC });
    tableB.belongsToMany(tableA, { through: tableC });
    tableA.hasMany(tableC);
    tableC.belongsTo(tableA);
    tableB.hasMany(tableC);
    tableC.belongsTo(tableB);
}