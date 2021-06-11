"use strict";
const bcrypt = require("bcryptjs");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates User model
class User extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

// Defines table fields
User.init(
  {
    // Creates ID Column (Primary Key)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },

  // Hash password automatically before User is created / updated
  {
    hooks: {
      beforeCreate(newUser) {
        newUser.password = bcrypt.hashSync(
          newUser.password,
          bcrypt.genSaltSync(10)
        );
        return newUser;
      },
      beforeUpdate(updateUser) {
        if (updateUser.password) {
          updateUser.password = bcrypt.hashSync(
            updatedUser.password,
            bcrypt.genSaltSync(10)
          );
        }
        return updateUser;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
