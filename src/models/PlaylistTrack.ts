import {Table, Column, Model, ForeignKey} from "sequelize-typescript";
import Playlist from "./Playlist";
import Track from "./Track";

@Table
class PlaylistTrack extends Model {
    @ForeignKey(() => Track)
    @Column
    trackId: number;

    @ForeignKey(() => Playlist)
    @Column
    playlistId: number;

    @Column
    position: number;
}

export default PlaylistTrack;