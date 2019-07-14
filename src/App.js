import React, { useState, useEffect } from 'react'
import Player from './components/Player'
import PlayLists from './components/PlayLists'
import Controls from './components/Controls'

import './App.css'

const App = () => {
  const [auth, setAuth] = useState(null)
  const [device, setDevice] = useState(null)
  const [clientId, setClientId] = useState('')
  const [currentPlaylist, setPlaylist] = useState('')

  useEffect(() => {
    setupAuth()
    if(localStorage.getItem('spotify-client-id'))
      setClientId(localStorage.getItem('spotify-client-id'))
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
    localStorage.setItem('spotify-client-id', clientId)
    const authEndpoint = 'https://accounts.spotify.com/authorize'
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
    <div className='container'>
      <h1>Ambiance Generator</h1>
      { !auth && <div className='clientIdHolder'>
        <label>Enter Spotify Client ID</label>
        <input type='text' value={clientId} onChange={(e) => setClientId(e.target.value)}/>
        <span style={{ gridColumn: 'span 2'}}>This will be stored in localStorage so you don't have to enter it everytime</span>
      </div> }
      { auth && <Player token={auth.access_token} setDevice={setDevice} /> }
      { !auth && <button onClick={login} className='btn'>Login to Spotify</button> }
      { auth && <PlayLists auth={auth} device={device} setPlaylist={setPlaylist} /> }
      { auth && device && <Controls playList={currentPlaylist} device={device}/> }
    </div>
  )
}

export default App