export interface IPlaylist {
    id?: number;
    name: string;
    description: string | null;
    cover: string | null;
    isPrivate: boolean;
    userId: number;
}