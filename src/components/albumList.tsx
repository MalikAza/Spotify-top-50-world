import { useEffect, useState } from "react"
import SpotifyItem from "../models/spotifyItemModel"
import AlbumModel from "../models/albumModel"
import resetToken from "../funcs/spotifyToken"
import axios from 'axios'
import { Link } from "react-router-dom"

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState([])
  const [token, setToken] = useState('') // the token is generated each time the app is launched
  // TODO : Change this problem ^

  useEffect(() => {
    function getAlbums() {
      const tokenError = [400, 401, 403]
      const URL = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF'
      const CONFIG = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      const HEADERS = {
        "Authorization": `Bearer ${token}`
      }
      const axiosInstance = axios.create({
        url: URL,
        headers: HEADERS
      })
      
      axiosInstance.interceptors.response.use((response) => {
        return response
      }, (error) => {
        const originalRequest = error.config


        if (tokenError.includes(error.response?.status) && !originalRequest._retry) {
          originalRequest._retry = true

          return resetToken().then((newToken) => {
            setToken(newToken)
            originalRequest.headers.Authorization = `Bearer ${token}`

            return axiosInstance(originalRequest)
          })
        }
        return {error, status: error.response?.status}
      })

      axiosInstance.get(URL, CONFIG)
        .then((response) => response.data)
        .catch((error) => {
          console.error(error)
        })
          .then((json) => {
            if (typeof json === 'undefined') return []
            return json.tracks.items.map((item: SpotifyItem) => {
              return item.track.album
            })
          })
            .then((albums) => setAlbums(albums))
    }

    getAlbums()
  }, [token])

  const albumList = albums.map((album: AlbumModel) => {
    return (
      <Link to={`albums/${album.id}`} state={{album}} className="album" key={album.id}>
        <img src={album.images[0].url} alt={album.name} className="album-img"/>
        <p className="album-name">{album.name}</p>
        <p className="artists-names">{album.artists.map((artist) => {return artist.name}).join(', ')}</p>
      </Link>
    )
  })

  return (
    <div className="album-list">
      {albumList}
    </div>
  )
}

export default AlbumList