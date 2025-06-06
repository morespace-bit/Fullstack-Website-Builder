import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";

@Table({
  tableName: "users", // this is the name that is going to be show in the gui phpmyadmin
  modelName: "User", // this is the name which we are going to refrence inside this code when trying to access it
  timestamps: true,
})

// a bit of oop
class User extends Model {
  // these @ are decoratores wapper around classes and method to provide it do something that has been done

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "Student",
  })
  declare role: string;
}

export default User;
