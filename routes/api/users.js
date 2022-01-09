const express = require("express");

const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiUserSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
