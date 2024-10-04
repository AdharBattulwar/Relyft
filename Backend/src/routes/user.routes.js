import { Router } from "express";
import {
  handleGetAllUsers,
  handleChangePassword,
  handleGetCurrentUser,
  handleLogoutUser,
  handleRefreshAccessToken,
  handleUserLogin,
  handleUserSignUp,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { handleUserVerfication } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/").get(handleGetAllUsers);
userRouter.route("/signin").get().post(handleUserLogin);
userRouter.route("/logout").get(handleUserVerfication, handleLogoutUser);
userRouter.route("/signup").post(
  // upload.fields([
  //   { name: "avatar", maxCount: 1 },
  //   { name: "coverImage", maxCount: 1 },
  // ]),
  handleUserSignUp
);

export default userRouter;
