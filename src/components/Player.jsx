import React, { useEffect } from 'react'

const Player = ({token, setDevice}) => {
  useEffect(() => {
    if(!window.Spotify) return
    const player = new window.Spotify.Player({
      name: 'Ambience Generator',
      getOAuthToken: cb => { cb(token); }
    });
  
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      setDevice(player)
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
  }, [token, setDevice])

  return <></>
}

export default Player