'use strict';
const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}