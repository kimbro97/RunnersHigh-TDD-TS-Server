import * as express from "express";
import controllers from "../controllers";
import upload from "../modules/multer";
const router = express.Router()

router.get('/:userid', controllers.mypost) // 개별 게시물
router.get('/', controllers.ourpost) // 전체 게시물
router.post('/', upload.single('postimage'), controllers.post) // 게시물 작성
router.patch('/:postid', upload.single('postimage'), controllers.postedit) // 게시물 수정
router.delete('/:postid', controllers.postdelete) // 게시물 삭제
router.get('/comments/:postid', controllers.comments) // 게시물의 댓글 조회
router.post('/comment/:postid', controllers.comment) // 게시물의 댓글 작성