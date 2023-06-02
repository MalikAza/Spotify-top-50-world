import { useLocation } from "react-router-dom"
import SpotifyArtistModel from "../models/spotifyArtistModel"
import { Link } from "react-router-dom"

const Artist: React.FC = () => {
  const { state } = useLocation()
  const artist: SpotifyArtistModel = state.artist
  console.log(artist)
  return (
    <>
      <p>Name: {artist.name}</p>
      <a href={artist.external_urls.spotify} target="_blank">On Spotify</a>
      <div className="homepage-btn">
        <Link to={'/'}>Return to Homepage</Link> 
      </div>
    </>
  )
}
export default Artist