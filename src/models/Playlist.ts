import {Table, Column, Model, BelongsToMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import {IPlaylist} from "../interfaces/IPlaylist";
import Track from "./Track";
import PlaylistTrack from "./PlaylistTrack";
import User from "./User";

@Table
class Playlist extends Model<IPlaylist> {
    @Column
    name: string;

    @Column
    description: string;

    @Column({allowNull: true})
    cover: string;

    @Column
    isPrivate: boolean;

    @BelongsToMany(() => Track, () => PlaylistTrack)
    tracks: Track[];

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}

export default Playlist;