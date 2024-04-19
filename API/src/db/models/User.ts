import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Request from './Request';

@Table({
  timestamps: true,
  tableName: 'Users',
  modelName: 'Users',
})
class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @HasMany(() => Request)
  declare requests: Request[];
}

export default User;
