import { Router } from "express";
import { sendMessageToAdmin, getAllMessagesOfUsers } from "../controllers/user.controller";

const router = Router();

router.route("/send-message").post(sendMessageToAdmin);
router.route("/get-all-messages").get(getAllMessagesOfUsers);

export default router;
