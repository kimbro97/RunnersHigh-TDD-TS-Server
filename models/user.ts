import { DataTypes, Model } from 'sequelize'
import { sequelize } from './sequelize'
import { dbType } from './index';


class User extends Model {
  public id!: number;
  public nickname!: string;
  public password!: string;
  public email!: string;
  public image_url!: string;
  public social_type!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  nickname: DataTypes.STRING,
  password: DataTypes.STRING,
  email: DataTypes.STRING,
  image_url: DataTypes.STRING,
  social_type: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  charset: 'utf8mb4', //  한글+이모티콘
  collate: 'utf8mb4_general_ci',
})

export const associate = (db: dbType) => {
    
};
  
export default User