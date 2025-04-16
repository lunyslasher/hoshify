import {MaxInt, SpotifyApi} from "@spotify/web-api-ts-sdk";
import dotenv from "dotenv";
import {ITrack} from "../interfaces/ITrack";
import mapSpotifyTrack from "../utils/normalizeTrack";

dotenv.config();

const api = SpotifyApi.withClientCredentials(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!);

class SpotifyPlatform {
    async searchTracks(title: string, limit?: MaxInt<50>, offset?: number): Promise<ITrack[]> {
        try {
            const data = await api.search(title, [`track`], undefined, limit, offset);
            return data.tracks?.items.map(e => mapSpotifyTrack(e)) || [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getTrackById(trackId: string): Promise<ITrack | null> {
        try {
            const data = await api.tracks.get(trackId);
            if(!data) {
                return null;
            }
            return mapSpotifyTrack(data);
        } catch (e){
            console.error(e);
            return null;
        }
    }
}

export default new SpotifyPlatform();

new SpotifyPlatform().getTrackById(`0Y84vLtyOj2demvSdJ2l7N`).then(tracks => {console.log(tracks)});