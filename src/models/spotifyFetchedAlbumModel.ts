import SpotifyTrackModel from "./spotifyTrackModel"

export default interface SpotifyFetchedAlbumModel {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  href: string
  id: string
  images: {
    height: null|number
    url: string
    width: null|number
  }[]
  name: string
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
  }
  primary_color: null|string
  type: string
  tracks: {
    items: {
      track: SpotifyTrackModel
    }[]
  }
}