import {Table, Column, Model} from "sequelize-typescript";

@Table
class User extends Model {
    @Column
    email: string;

    @Column
    password: string;
}

export default User;