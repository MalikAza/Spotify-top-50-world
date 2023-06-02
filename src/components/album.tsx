import { useLocation } from "react-router-dom"
import AlbumModel from "../models/albumModel"
import { Link } from "react-router-dom"

const Album: React.FC = () => {
  const { state } = useLocation()
  const album: AlbumModel = state.album

  return (
    <div className="album-page">
      <h1>{album.name}</h1>
      <img src={album.images[0].url} alt={album.name} className="album-page-img"/>
      <div className="album-page-infos">
        <p className="album-page-artists-names">Artist(s): {album.artists.map((artist) => {return artist.name}).join(', ')}</p>
        <p>Release date: {album.release_date}</p>
        <p>Total tracks: {album.total_tracks}</p>
        <p>Listen on <a href={album.external_urls.spotify} target="_blank" className="spotify-link">Spotify</a></p>
      </div>
      <div className="homepage-btn">
        <Link to={'/'}>Return to Homepage</Link> 
      </div>
    </div>
  )
}

export default Album