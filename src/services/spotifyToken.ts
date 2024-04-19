const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET

export default function resetToken() {
  const URL = 'https://accounts.spotify.com/api/token'

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Spotify Client ID or Secret is missing.')
  }

  const newToken: Promise<string> = fetch(URL, {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': CLIENT_ID,
      'client_secret': CLIENT_SECRET
    })
  })
    .then((response) => {
      return response.json()
    })
      .then((json) => {return json.access_token})

  return newToken
}