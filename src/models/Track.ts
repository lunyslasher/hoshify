import {Table, Column, Model, BelongsToMany, DataType} from "sequelize-typescript";
import {ITrack} from "../interfaces/ITrack";
import PlaylistTrack from "./PlaylistTrack";
import Playlist from "./Playlist";

@Table
class Track extends Model<ITrack> {
    @Column
    name: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: []
    })
    artists: string[];

    @Column
    album: string;

    @Column
    duration: number;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
        defaultValue: [],
    })
    cover: {
        size: number;
        url: string;
    }[];

    @Column({
        type: DataType.JSONB,
        allowNull: false
    })
    external: {
        platform: string;
        url: string;
        uri?: string;
        id: string;
    };

    @Column({
        allowNull: true
    })
    previewUrl?: string;
    explicit: boolean;

    @BelongsToMany(() => Playlist, () => PlaylistTrack)
    playlists: Playlist[]
}

export default Track;