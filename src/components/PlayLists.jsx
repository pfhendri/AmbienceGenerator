import React, { useState, useEffect } from 'react'

const PlayLists = ({auth, device}) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${auth.token_type} ${auth.access_token}`
    }

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers
    }).then(data => data.json())
      .then(({items}) => setPlaylists(items) )
  }, [auth])

  const startPlaylist = (uri) => {
    const headers = {
      'Authorization': `${auth.token_type} ${auth.access_token}`
    }
    const body = {
      context_uri: uri
    }
    // use an active device
    // send to the control endpoint https://api.spotify.com/v1/me/player/play
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
  }

  return (
    <div>
      { playlists.length > 0 && <ul>
        { playlists.map( list => <li key={list.id}>{list.name} <button onClick={() => startPlaylist(list.uri)}>Play</button></li>)}
      </ul> }
    </div>
  )
}

export default PlayLists