import { useLocation } from "react-router-dom"
import SpotifyArtistModel from "../models/spotifyArtistModel"
import { Link } from "react-router-dom"

function Artist() {
  const { state } = useLocation()
  const artist: SpotifyArtistModel = state.artist
  console.log(artist)
  
  return (
    <>
      <p>Name: {artist.name}</p>
      <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">On Spotify</a>
      <button className="homepage-btn">
        <Link to={'/'}>
          <span>Return to Homepage</span>
        </Link>
      </button>
    </>
  )
}
export default Artist