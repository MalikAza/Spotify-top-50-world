export default interface SpotifyFetchedArtistModel {
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  genres: string[]
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  popularity: number
  type: string
}