import User, {associate as associateUser} from './user'
import Chatting, {associate as associateChatting} from './chatting'

export * from './sequelize' // 임폴트한 동시에 익스포트

const db = {
    User,
    Chatting,
};

export type dbType = typeof db;

associateUser(db)
associateChatting(db)