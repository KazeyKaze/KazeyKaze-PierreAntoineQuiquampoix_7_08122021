const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

///////////////////////////////
// ROUTER
///////////////////////////////
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, userCtrl.modifyUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);

module.exports = router;
