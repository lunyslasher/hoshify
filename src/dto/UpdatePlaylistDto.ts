export interface UpdatePlaylistDto {
    playlistId: number;
    userId: number;
    name: string;
    description: string;
    isPrivate: boolean;
    cover: string;
}