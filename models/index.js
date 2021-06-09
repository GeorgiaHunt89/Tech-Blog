const user = require('./user');
const post = require('./post');
const comment = require('./comment');

// HasMany
user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});



// BelongsTo
post.belongsTo(user, {
    foreignKey:'user_id'
});

comment.belongsTo(post, {
    foreignKey:'post_id'
});

comment.belongsTo(user, {
    foreignKey:'user_id'
});



