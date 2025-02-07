import {Track} from "@spotify/web-api-ts-sdk";
import {ITrack} from "../interfaces/ITrack";

const mapSpotifyTrack = (track: Track)=> {
    const normalizedTrack: ITrack = {
        name: track.name,
        album: track.album.name,
        duration: Math.round(track.duration_ms/1000),
        artists: track.artists.map(e => e.name),
        explicit: track.explicit,
        cover: track.album.images.map(e => ({ size: e.height, url: e.url })),
        external: {
            url: track.external_urls.spotify,
            uri: track.uri,
            platform: 'spotify',
            id: track.id,
        },
        previewUrl: track.preview_url || null,
    };
    return normalizedTrack;
}

export default mapSpotifyTrack;