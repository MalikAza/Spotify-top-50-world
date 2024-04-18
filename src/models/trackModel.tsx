import SpotifyArtistModel from "./spotifyArtistModel";

export default interface TrackModel {
  artists: SpotifyArtistModel[],
  disc_number: BigInteger,
  duration_ms: BigInteger,
  explicit: boolean,
  external_urls: {
      spotify: string
  },
  id: BigInteger,
  is_local: boolean,
  name: string,
  preview_url: string
}