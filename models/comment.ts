import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class Comment extends Model {
  public id!: number;
  public comment!: string;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init({
  comment: DataTypes.TEXT,
  userId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default Comment