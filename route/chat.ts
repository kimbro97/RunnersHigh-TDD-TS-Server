import * as express from "express";
import controllers from "../controllers";

const router = express.Router()

router.get('/room', controllers.rooms)
router.post('/room', controllers.room)
router.get('/message/:roomid', controllers.messages)
router.post('/message', controllers.message)
