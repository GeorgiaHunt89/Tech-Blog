const Users = require("./users");
const Posts = require("./posts");
const Comments = require("./comments");

// HasMany
Users.hasMany(Posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// BelongsTo
Posts.belongsTo(Users, {
  foreignKey: "user_id",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
});

Comments.belongsTo(Users, {
  foreignKey: "user_id",
});

// BelongsToMany
Users.belongsToMany(Posts, {
  foreignKey: "user_id",
  through: "user_posts",
  timestamps: false,
});

Users.belongsToMany(Comments, {
  foreignKey: "user_id",
  through: "user_comments",
  timestamps: false,
});

module.exports = {
  Users,
  Posts,
  Comments,
};
