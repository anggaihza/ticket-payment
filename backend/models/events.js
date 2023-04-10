"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.belongsTo(models.Users, {
        foreignKey: {
          name: "admin_id",
        },
      });
      Events.hasMany(models.Transactions, {
        foreignKey: "event_id",
      });
    }
  }
  Events.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticketQuota: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
