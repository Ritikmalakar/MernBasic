import express from "express";
import {
  create,
  deleteData,
  getAll,
  getOne,
  updateData
} from "../controller/todoController.js";

import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("image"),
  create
);

router.get(
  "/getAll",
  auth,
  getAll
);

router.post(
  "/delete/:id",
  deleteData
);

router.get(
  "/getOne/:id",
  getOne
);

router.post(
  "/update/:id",
  upload.single("image"),
  updateData
);

export default router;