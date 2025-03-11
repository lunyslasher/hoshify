export interface ITrack {
    id?: number;
    name: string;
    artists: string[];
    album: string;
    duration: number;
    cover: {
        size: number;
        url: string;
    }[],
    external: {
        platform: string;
        url: string;
        uri?: string;
        id: string;
    };
    previewUrl?: string | null;
    explicit: boolean;
}
