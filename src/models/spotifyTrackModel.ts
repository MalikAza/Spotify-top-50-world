import SpotifyAlbumModel from "./spotifyAlbumModel";
import SpotifyArtistModel from "./spotifyArtistModel";

export default interface SpotifyTrackModel {
  album: SpotifyAlbumModel
  artists: SpotifyArtistModel[]
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  id: string
  name: string
  popularity: number
  preview_url: string
  type: string
}