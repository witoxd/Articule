import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { User } from './User';
export class Article extends Model {

  public stock_min!: number;
  public stock_max!: number;
  public quality!: string;
  public name!: string;
  public UserId!: number;

}

export interface ArticleI {
  stock_min: number;
  stock_max: number;
  quality: string;
  name: string;
  UserId: number;
}


Article.init(
  {
    stock_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
},
{
  tableName: "articles",
  sequelize: database,
  timestamps: false
}
);
Article.belongsTo(User,{foreignKey:"UserId"})
