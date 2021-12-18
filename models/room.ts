import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class Room extends Model {
  public id!: number;
  public room!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init({
  room: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Room',
  tableName: 'rooms',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default Room