import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class Chatting extends Model {
  public id!: number;
  public chat!: string;
  public userId!: number;
  public roomId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Chatting.init({
  chat: DataTypes.TEXT,
  userId: DataTypes.INTEGER,
  roomId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Chatting',
  tableName: 'chattings',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default Chatting