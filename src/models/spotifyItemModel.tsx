import AlbumModel from "./albumModel"

export default interface SpotifyItem {
    track: {
        album: AlbumModel
        href: string
        id: string
        name: string
        popularity: number
    }
}