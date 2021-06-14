const user = require("./users");
const post = require("./posts");
const comment = require("./comments");
const tag = require("./tags");

// HasMany
user.hasMany(post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

user.hasMany(comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

post.hasMany(comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// BelongsTo
post.belongsTo(user, {
  foreignKey: "user_id",
});

comment.belongsTo(post, {
  foreignKey: "post_id",
});

comment.belongsTo(user, {
  foreignKey: "user_id",
});

// BelongsToMany
post.belongsToMany(tag, {
  foreignKey: "post_id",
  through: "post_tags",
  timestamps: false,
});

tag.belongsToMany(post, {
  foreignKey: "tag_id",
  through: "tag_tags",
  timestamps: false,
});

user.belongsToMany(post, {
  foreignKey: "user_id",
  through: "user_posts",
  timestamps: false,
});

user.belongsToMany(comment, {
  foreignKey: "user_id",
  through: "user_comments",
  timestamps: false,
});

module.exports = {
  user,
  post,
  comment,
  tag,
};
