import AlbumModel from "./albumModel"

export default interface SpotifyItem {
    track: {
        album: AlbumModel
    }
}