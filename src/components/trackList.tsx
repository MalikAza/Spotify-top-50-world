import React, { useCallback, useEffect, useState } from "react"
import axiosInstance from "../funcs/axiosInstance"
import SpotifyItem from "../models/spotifyItemModel"
import TrackFetchModel from "../models/trackFetchModel"
import { Link } from "react-router-dom"

function TrackList() {
  const [albumDataTracks, setAlbumDataTracks] = useState<SpotifyItem['track'][]>([])
  const [tracks, setTracks] = useState<TrackFetchModel[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  async function getAlbumDataTracks() {
    const token = sessionStorage.getItem('spotify_token')
    const URL = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF'
    const CONFIG = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      const response = await axiosInstance.get(URL, CONFIG)
      const albumDataTracks = response.data.tracks.items.map((item: SpotifyItem) => item.track)
      setAlbumDataTracks(albumDataTracks)
    } catch (error) {
      console.error(error)
    }
  }

  const getTracks = useCallback(async () => {
    const token = sessionStorage.getItem('spotify_token')
    const CONFIG = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    try {
      const trackPromises = albumDataTracks.map(async (track) => {
        const response = await axiosInstance.get(track.href, CONFIG)
        return response.data as TrackFetchModel
      })

      const trackData = await Promise.all(trackPromises)
      setTracks(trackData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoaded(true)
    }
  }, [albumDataTracks])

  useEffect(() => {
    getAlbumDataTracks()
      .then(() => getTracks())
  }, [getTracks])

  return (
    <>
      {!isLoaded && <div className="loading">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>}
      <div className="track-list">
        {
          tracks.map(track => {
            return (
              <div className="track" key={track.id}>
                <Link to={`tracks/${track.id}`} state={{track}}>
                  <img src={track.album.images[0].url} alt={track.album.name} className="album-img" />
                  <p className="track-name">{track.name}</p>
                </Link>
                <p className="artists-names"> {track.artists.map((artist, index) => {
                  return (
                    <React.Fragment key={artist.id}>
                      <Link to={`artists/${artist.id}`} state={{artist}} className="artist-link">{artist.name}</Link>
                      {index < track.artists.length-1 && <span>, </span>}
                    </React.Fragment>
                  )
                })}
                </p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default TrackList