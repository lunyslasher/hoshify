import {MaxInt, SpotifyApi} from "@spotify/web-api-ts-sdk";
import dotenv from "dotenv";
import {ITrack} from "../interfaces/ITrack";
import mapSpotifyTrack from "../utils/normalizeTrack";
dotenv.config({path: "../../.env"});

const api = SpotifyApi.withClientCredentials(process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!);

class SpotifyService {
    async searchTracks(title: string, limit?: MaxInt<50>, offset?: number): Promise<ITrack[]> {
        try {
            const data = await api.search(title, [`track`], undefined, limit, offset);
            return data.tracks?.items.map(e => mapSpotifyTrack(e)) || [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export default new SpotifyService();