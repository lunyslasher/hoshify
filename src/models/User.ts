import {Table, Column, Model, HasMany} from "sequelize-typescript";
import {IUser} from "../interfaces/IUser";
import Playlist from "./Playlist";

@Table
class User extends Model<IUser> {
    @Column
    email: string;

    @Column
    password: string;

    @HasMany(() => Playlist)
    playlists: Playlist[];
}

export default User;