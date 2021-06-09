const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Creates Comment model
class comment extends Model {}
    // Defines table fields
    comment.init(
    {
        // Creates ID Column (Primary Key)
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: true,
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
        post_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'post',
              key: 'id',
            },
        },
    },

    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }

    );

    module.exports = comment;