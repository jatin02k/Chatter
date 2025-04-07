import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { getUsers,getMessages,sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", isLoggedIn,getUsers);
router.get("/:id", isLoggedIn,getMessages);
router.post("/send/:id", isLoggedIn,sendMessages);

export default router;