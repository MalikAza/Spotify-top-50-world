import { useLocation } from "react-router-dom"
import SpotifyTrackModel from "../models/spotifyTrackModel"
import { Link } from "react-router-dom"
import React from "react"

function Track() {
  const { state } = useLocation()
  const track: SpotifyTrackModel = state.track
  return (
    <div className="album-page">
      <h1>{track.name}</h1>
      <iframe
        style={{border: 'none', borderRadius: '14px'}}
        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Track Embed"
      />
      <div className="album-page-infos">
        <p className="album-page-artists-names">Artist(s): 
        {
          track.artists.map((artist, index) => {
            return (
              <React.Fragment key={artist.id}>
                <Link to={`../artists/${artist.id}`} state={{artist}} className="artist-link"> {artist.name}</Link>
                {index < track.artists.length-1 && <span>,</span>}
              </React.Fragment>
              )
          })
        }
        </p>
        <p>Release date: {new Date(track.album.release_date.split('/').reverse().join('-')).toLocaleDateString()}</p>
        <p>Listen on <a href={track.external_urls.spotify} target="_blank" rel="noreferrer" className="spotify-link">Spotify</a></p>
      </div>
      <Link to={'/'}>
        <button className="homepage-btn">
          <span>Return to Homepage</span>
        </button>
      </Link>
    </div>
  )
}

export default Track