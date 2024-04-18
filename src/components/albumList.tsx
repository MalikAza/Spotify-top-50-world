import { useEffect, useState } from "react"
import SpotifyItem from "../models/spotifyItemModel"
import AlbumModel from "../models/albumModel"
import { Link } from "react-router-dom"
import axiosInstance from "../funcs/axiosInstacne"

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    function getAlbums() {
      const token = sessionStorage.getItem('spotify_token')
      const URL = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF'
      const CONFIG = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }

      axiosInstance.get(URL, CONFIG)
        .then((response) => response.data)
        .catch((error) => {
          console.error(error)
        })
          .then((json) => {
            console.log(json)
            if (typeof json === 'undefined') return []
            return json.tracks.items.map((item: SpotifyItem) => {
              return item.track.album
            })
          })
            .then((albums) => {
              setAlbums(albums)
              setIsLoaded(true)
            })
    }

    // setTimeout(() => getAlbums(), 500)
    getAlbums()
  }, [])

  const albumList = albums.map((album: AlbumModel) => {
    return (
      <Link to={`albums/${album.id}`} state={{album}} className="album" key={album.id}>
        <img src={album.images[0].url} alt={album.name} className="album-img"/>
        <p className="album-name">{album.name}</p>
        <p className="artists-names">{album.artists.map((artist, index) => {
          return (<>
          <Link to={`artists/${artist.id}`} state={{artist}} className="artist-link">{artist.name}</Link>
          {index < album.artists.length-1 && <span>, </span>}
          </>)
        })}</p>
      </Link>
    )
  })

  return (
    <>
      {!isLoaded && <div className="loading">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>}
      <div className="album-list">
        {albumList}
      </div>
    </>
  )
}

export default AlbumList