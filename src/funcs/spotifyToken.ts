import axios from 'axios'
import * as spotifyConfig from '../spotifyConfig'

export default function resetToken() {
  const URL = 'https://accounts.spotify.com/api/token'
  const newToken: Promise<string> = fetch(URL, {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': spotifyConfig.CLIENT_ID,
      'client_secret': spotifyConfig.CLIENT_SECRET
    })
  })
    .then((response) => {
      return response.json()
    })
      .then((json) => {return json.access_token})

  return newToken
}