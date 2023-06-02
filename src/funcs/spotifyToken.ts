import axios from 'axios'
import * as spotifyConfig from '../spotify.config'

export default function resetToken() {
  const URL = 'https://accounts.spotify.com/api/token'
  const DATA = new URLSearchParams({
    "grant_type": "client_credentials",
    "client_id": spotifyConfig.CLIENT_ID,
    "client_secret": spotifyConfig.CLIENT_SECRET
  })
  const CONFIG = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    DATA
  }
  const newToken: Promise<string> = axios.post(URL, CONFIG)
    .then((response) => {
      return response.data.json()
    })
      .then((json) => {return json.access_token})

  return newToken
}