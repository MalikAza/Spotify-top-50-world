import { useEffect, useState } from "react"
import { SPOTIFY_TOKEN } from "../js/env"
import SpotifyItem from "../models/spotifyItemModel"
import AlbumModel from "../models/albumModel"

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    function getAlbums() {
      const URL = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF'
      const TOKEN = SPOTIFY_TOKEN
      const REQUEST = new Request(URL, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${TOKEN}`
        }
      })
      
      return fetch(REQUEST)
        .then((response) => response.json())
        .then((json) => {
          return json.tracks.items.map((item: SpotifyItem) => {
            return item.track.album
          })
        })
        .then((albums) => setAlbums(albums))
    }

    getAlbums()
  }, [])

  const albumList = albums.map((album: AlbumModel) => {
    return (
      <div className="album" key={album.id}>
        <img src={album.images[0].url} alt={album.name} className="album-img"/>
        <p className="album-name">{album.name}</p>
        <p className="artists-names">{album.artists.map((artist) => {return artist.name}).join(', ')}</p>
      </div>
    )
  })

  return (
    <div className="album-list">
      {albumList}
    </div>
  )
}

export default AlbumList