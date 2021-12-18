import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class User_Room extends Model {
  public id!: number;
  public userId!: number;
  public pairId!: number;
  public roomId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User_Room.init({
  userId: DataTypes.INTEGER,
  roomId: DataTypes.INTEGER,
  pairId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'User_Room',
  tableName: 'user_rooms',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default User_Room