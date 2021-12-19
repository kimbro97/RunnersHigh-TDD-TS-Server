import * as express from "express";
import controllers from "../controllers";
import upload from "../modules/multer";
const router = express.Router()

router.post('/login', controllers.login) // 유저가 로그인
router.post('/logout', controllers.logout) // 유저가 로그아웃
router.post('/signup', controllers.signup) // 회원 가입
router.delete('/userinfo', controllers.signout) // 회원탈퇴는 유저의 정보를 지운다
router.get('/userinfo', controllers.userinfo) // 회원정보 조회
router.patch('/userinfo', upload.single('userimage'), controllers.userinfoedit) // 회원정보 수정

export default router