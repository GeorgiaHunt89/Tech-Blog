const bcrypt = require("bcryptjs");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates User model
class User extends Model {
  validPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
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
        len: [4],
      },
    },
  },

  // Hash password automatically before User is created / updated
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hashSync(
          newUserData.password,
          bcrypt.genSaltSync(10)
        );
        return newUserData;
      },
      async beforeUpdate(updateUserData) {
        updateUserData.password = await bcrypt.hashSync(
          updatedUserData.password,
          bcrypt.genSaltSync(10)
        );
        return updateUserData;
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
