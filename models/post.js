const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Creates Post model
class post extends Model {}
    // Defines table fields
    post.init(
    {

        // Creates ID Column (Primary Key)
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },

    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post',
    }

    );

    module.exports = post;