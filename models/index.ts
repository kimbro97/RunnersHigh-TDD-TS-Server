import User, {associate as associateUser} from './user'
import Chatting, {associate as associateChatting} from './chatting'
import Comment, {associate as associateComment} from './comment';
import Post, {associate as associatePost} from './comment';
import Room, {associate as associateRoom} from './comment';
import User_Room, {associate as associateUser_Room} from './comment';
export * from './sequelize' // 임폴트한 동시에 익스포트

const db = {
    User,
    Chatting,
    Comment,
    Post,
    Room,
    User_Room
};

export type dbType = typeof db;

associateUser(db)
associateChatting(db)
associateComment(db)
associatePost(db)
associateRoom(db)
associateUser_Room(db)