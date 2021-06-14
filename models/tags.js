const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class tag extends Model {}

// Creates fields/columns for User model
tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "tag",
  }
);

module.exports = tag;
