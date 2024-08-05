module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      buyerId: DataTypes.INTEGER,
      providerId: DataTypes.INTEGER,
      cnpjId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      nNf: DataTypes.INTEGER,
      emissionDate: DataTypes.DATE,
      orderStatusBuyer: DataTypes.STRING,
      value: DataTypes.DECIMAL,
    }, {
      tableName: 'orders',
      timestamps: false
    });
  
    return Order;
  };