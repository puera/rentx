import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUsersController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserAvatarControler } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarControler();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticate, profileUserController.handle);

export { usersRoutes };
