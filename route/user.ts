import * as express from "express";
import controllers from "../controllers";

const router = express.Router()

router.post('/login', controllers.login)

export default router