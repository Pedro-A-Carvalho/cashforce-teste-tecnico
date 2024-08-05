module.exports = (sequelize, DataTypes) => {
    const Provider = sequelize.define('Provider', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }, {
      tableName: 'providers',
      timestamps: false
    });
  
    return Provider;
  };