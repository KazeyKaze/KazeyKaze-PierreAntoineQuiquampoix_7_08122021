const Sequelize = require("sequelize");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const CommentModel = require("../models/comment.model");
const fs = require("fs");
const { where } = require("sequelize/dist");

///////////////////////////////
// POST
///////////////////////////////
exports.createPost = (req, res, next) => {
  if (req.body.image === "null" && !req.body.text) {
    return res
      .status(400)
      .json({ message: "Votre post ne peut pas être vide." });
  } else {
    const post = new PostModel({
      UserId: req.token.userId,
      text: req.body.text,
      image: req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
    });
    post
      .save()
      .then(() =>
        res.status(201).json({
          message: "Post enregistré !",
        })
      )
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }
};

///////////////////////////////
// PUT
///////////////////////////////
exports.modifyPost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.UserId === req.token.userId || req.token.isAdmin === true) {
        if (req.file != undefined) {
          if (post.image != undefined) {
            const filename = post.image.split("/images/")[1];
            fs.unlink(`images/${filename}`, function (err) {
              if (err) console.log("error", err);
            });
          }
          post.image = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }
        if (req.body.text) {
          post.text = req.body.text;
        }
        post
          .save()
          .then(() =>
            res.status(201).json({
              message: "Post modifié !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      } else {
        res.status(403).json({
          message: "403: unauthorized request !",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({
        err,
      })
    );
};

///////////////////////////////
// DELETE
///////////////////////////////
exports.deletePost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (post.UserId === req.token.userId || req.token.isAdmin === true) {
        if (post.image) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, function (err) {
            if (err) console.log("error", err);
          });
        }
        PostModel.destroy({
          where: { id: req.params.id },
        })
          .then(() =>
            res.status(200).json({
              message: "Post supprimé !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      } else {
        res.status(403).json({
          message: "403: unauthorized request !",
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

///////////////////////////////
// GET ALL
///////////////////////////////
exports.getAllPosts = (req, res, next) => {
  PostModel.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: UserModel,
        attributes: ["firstName", "lastName"],
      },
      {
        model: CommentModel,
        include: [
          {
            model: UserModel,
            attributes: ["firstName", "lastName"],
          },
        ],
      },
    ],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

///////////////////////////////
// GET BY ID
///////////////////////////////
exports.getOnePost = (req, res, next) => {
  PostModel.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
