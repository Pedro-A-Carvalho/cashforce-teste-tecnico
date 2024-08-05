module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define('Buyer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }, {
      tableName: 'buyers',
      timestamps: false
    });
  
    return Buyer;
  };