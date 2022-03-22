"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Order.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.TEXT,
      pincode: DataTypes.STRING,
      place: DataTypes.STRING,
      phone: DataTypes.STRING,
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stripe_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
