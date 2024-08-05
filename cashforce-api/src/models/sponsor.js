module.exports = (sequelize, DataTypes) => {
    const Sponsor = sequelize.define('Sponsor', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cnpjId: DataTypes.INTEGER
    }, {
      tableName: 'sponsors',
      timestamps: false
    });
  
    return Sponsor;
  };