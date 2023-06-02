import SpotifyArtistModel from "./spotifyArtistModel";

export default interface AlbumModel {
  artists: Array<SpotifyArtistModel>,
  external_urls: {
    spotify: string
  }
  id: string,
  images: Array<{url:string}>,
  name: string,
  release_date: string,
  total_tracks: BigInteger,
}