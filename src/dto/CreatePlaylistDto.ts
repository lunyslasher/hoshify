export interface CreatePlaylistDto {
    name: string;
    description?: string;
    cover?: string;
    isPrivate?: boolean;
    userId: number;
}
