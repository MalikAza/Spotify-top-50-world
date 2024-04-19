import SpotifyAlbumModel from "./spotifyAlbumModel"

export default interface SpotifyItem {
    track: {
        album: SpotifyAlbumModel
        href: string
        id: string
        name: string
        popularity: number
    }
}