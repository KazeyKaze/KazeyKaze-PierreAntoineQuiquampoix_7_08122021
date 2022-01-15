const Post = require("./post.model");
const User = require("./user.model");
const Comment = require("./comment.model");
const { FOREIGNKEYS } = require("sequelize/dist/lib/query-types");

const initdb = async () => {
  await Post.belongsTo(User, { onDelete: "cascade", onUpdate: "cascade" });
  await Comment.belongsTo(User, { onDelete: "cascade", onUpdate: "cascade" });
  await Post.hasMany(Comment);

  await Post.sync({ alter: true });
  await User.sync({ alter: true });
  await Comment.sync({ alter: true });
};

module.exports = initdb;