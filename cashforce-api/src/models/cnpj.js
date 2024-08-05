module.exports = (sequelize, DataTypes) => {
    const Cnpj = sequelize.define('Cnpj', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      number: DataTypes.STRING
    }, {
      tableName: 'cnpjs',
      timestamps: false
    });
  
    return Cnpj;
  };