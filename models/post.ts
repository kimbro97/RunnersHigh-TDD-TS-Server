import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class Post extends Model {
  public id!: number;
  public title!: string;
  public thumbnail_url!: string;
  public text!: string;
  public location!: string;
  public latitude!: string;
  public longitude!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  title: DataTypes.STRING,
  thumbnail_url: DataTypes.STRING,
  text: DataTypes.STRING,
  location: DataTypes.STRING,
  latitude: DataTypes.STRING,
  longitude: DataTypes.STRING,
  userId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'posts',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default Post