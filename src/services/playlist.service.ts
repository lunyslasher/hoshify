import {config} from 'dotenv';
import Playlist from "../models/Playlist";
import {CreatePlaylistDto} from "../dto/CreatePlaylistDto";
import {DeletePlaylistDto} from "../dto/DeletePlaylistDto";
import {UpdatePlaylistDto} from "../dto/UpdatePlaylistDto";
import createError from 'http-errors';

config();

class PlaylistService {
    async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
        const playlist = await Playlist.create({
            userId: dto.userId,
            description: dto.description ?? null,
            cover: dto.cover ?? null,
            name: dto.name,
            isPrivate: dto.isPrivate ?? false,
        });

        await playlist.save();

        return playlist;
    }

    async deletePlaylist(dto: DeletePlaylistDto): Promise<void> {
        const playlist = await Playlist.findOne({where: {id: dto.playlistId}});

        if (!playlist) {
            throw createError(404, `Playlist not found`);
        }

        if (playlist.userId !== dto.userId) {
            throw createError(403, `Forbidden`);
        }

        await playlist.destroy({});
        return;
    }

    async updatePlaylist(dto: UpdatePlaylistDto): Promise<Playlist> {
        const playlist = await Playlist.findOne({where: {id: dto.playlistId}});

        if (!playlist) {
            throw createError(404, `Playlist not found`);
        }

        if (playlist.userId !== dto.userId) {
            throw createError(403, `Forbidden`);
        }

        return await playlist.update({
            name: dto.name ?? playlist.name,
            description: dto.description ?? playlist.description,
            cover: dto.cover ?? playlist.cover,
            isPrivate: dto.isPrivate ?? playlist.isPrivate
        });
    }
}