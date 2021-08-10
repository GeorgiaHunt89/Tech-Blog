const bcrypt = require("bcryptjs");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates User model
class Users extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

// Defines table fields
Users.init(
  {
    // Creates ID Column (Primary Key)
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
    },
  },

  // Hash password automatically before User is created / updated
  {
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(
          user.password,
          bcrypt.genSaltSync(10)
        );
        return user;
      },
      async beforeUpdate(user) {
        user.password = await bcrypt.hash(
          user.password,
          bcrypt.genSaltSync(10)
        );
        return user;
      },
    },
    sequelize,
    modelName: "users",
  }
);

module.exports = Users;
