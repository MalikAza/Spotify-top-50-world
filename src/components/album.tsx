import { useLocation } from "react-router-dom"
import AlbumModel from "../models/albumModel"
import { Link } from "react-router-dom"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axiosInstance from "../funcs/axiosInstacne"
import AlbumFetchModel from "../models/albumFetchModel"

const Album: React.FC = () => {
  const { state } = useLocation()
  const album: AlbumModel = state.album
  const [albumFetched, setAlbumFetched] = useState<AlbumFetchModel>()

  useEffect(() => {
    function fetchAlbum() {
      const token = sessionStorage.getItem('spotify_token')
      const CONFIG = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      const URL = `https://api.spotify.com/v1/albums/${album.id}`

      axiosInstance.get(URL, CONFIG)
        .then((response) => response.data)
        .catch((error) => console.error(error))
          .then((json) => {
            if (typeof json === 'undefined') return []
            return json
          })
            .then((album) => setAlbumFetched(album))
    }

    fetchAlbum()
  }, [])

  return (
    <div className="album-page">
      <h1>{album.name}</h1>
      <iframe style={{borderRadius: '14px'}} src={`https://open.spotify.com/embed/album/${album.id}?utm_source=generator`} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      {/* <img src={album.images[0].url} alt={album.name} className="album-page-img"/> */}
      <div className="album-page-infos">
        <p className="album-page-artists-names">Artist(s): {album.artists.map((artist, index) => {
          return (<>
            <Link to={`../artists/${artist.id}`} state={{artist}} className="artist-link">{artist.name}</Link>
            {index < album.artists.length-1 && <span>, </span>}
          </>)
        })}</p>
        <p>Release date: {album.release_date}</p>
        <p>Total tracks: {album.total_tracks}</p>
        <p>Listen on <a href={album.external_urls.spotify} target="_blank" className="spotify-link">Spotify</a></p>
        <p>Popularity: {albumFetched?.popularity}</p>
      </div>
      <Link to={'/'}>
        <button className="homepage-btn">
          <span>Return to Homepage</span>
        </button>
      </Link>
    </div>
  )
}

export default Album