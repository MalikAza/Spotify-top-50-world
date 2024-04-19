import { useLocation } from "react-router-dom"
import SpotifyArtistModel from "../models/spotifyArtistModel"
import { useCallback, useEffect, useState } from "react"
import axiosInstance from "../services/axiosInstance"
import SpotifyFetchedArtistModel from "../models/spotifyFetchedArtistModel"
import { Link } from "react-router-dom"

function Artist() {
  const { state } = useLocation()
  const artist: SpotifyArtistModel = state.artist
  const [artistData, setArtistData] = useState<SpotifyFetchedArtistModel>()
  
  const getArtistData = useCallback(async () => {
    const token = sessionStorage.getItem('spotify_token')
    const CONFIG = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      const response = await axiosInstance.get(artist.href, CONFIG)
      setArtistData(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [artist])

  useEffect(() => {
    if (artist) {
      getArtistData()
    }
  }, [getArtistData, artist])

  return (
    <div className="artist-page">
      <h1>{artistData?.name}</h1>
      <ul className="genre-container">
        {
          artistData?.genres.map((genre, index) => {
            return (
              <li className="artist-genre" key={index}><span>#</span>{genre}</li>
            )
          })
        }
      </ul>
      <iframe
        style={{border: 'none', borderRadius: '14px'}}
        src={`https://open.spotify.com/embed/artist/${artistData?.id}?utm_source=generator`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Artist Embed"
      />
      <div className="artist-page-infos">
        <p>Followers: {artistData?.followers.total.toLocaleString()}</p>
        <p>Listen on <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer" className="spotify-link">Spotify</a></p>
      </div>
      <Link to={'/'}>
        <button className="homepage-btn">
          <span>Return to Homepage</span>
        </button>
      </Link>
    </div>
  )
}
export default Artist