import React, { useState, useEffect } from 'react'
import Player from './components/Player'
import PlayLists from './components/PlayLists'

const App = () => {
  const [auth, setAuth] = useState(null)
  const [device, setDevice] = useState('')

  useEffect(() => {
    setupAuth()
  }, [])

  const setupAuth = () => {
    if(!window.location.hash.includes('token')) return 
    const hash = {}
    window.location.hash
      .replace('#', '')
      .split('&')
      .map(attr => attr.split('='))
      .map(set => hash[set[0]] = set[1])

    window.location.hash = ''
    setAuth(hash)
  }

  const login = () => {
    const authEndpoint = 'https://accounts.spotify.com/authorize'
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirectUri = 'http://localhost:3000'
    const scopes = [
      "playlist-read-private",
      "user-read-email",
      "user-modify-playback-state"
    ]
    const api = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    window.location.href = api
  }

  return(
    <div>
      <h1>Ambiance Generator</h1>
      { auth && <Player token={auth.access_token} setDevice={setDevice} /> }
      { !auth && <button onClick={login}>Login to Spotify</button> }
      { auth && <PlayLists auth={auth} device={device} /> }
    </div>
  )
}

export default App