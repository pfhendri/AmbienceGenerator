import React, { useState, useEffect } from 'react'

import './PlayLists.css'

const PlayLists = ({auth, device, setPlaylist}) => {
  const [playlists, setPlaylists] = useState([])
  const [filter, setFilter] = useState('')

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
    setPlaylist(uri)
    const headers = {
      'Authorization': `${auth.token_type} ${auth.access_token}`
    }
    const body = {
      context_uri: uri
    }
    // use an active device
    // send to the control endpoint https://api.spotify.com/v1/me/player/play
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device._options.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
  }

  const filteredPlayLists = () => {
    if( playlists.length > 0 )
      return <ul className='List'>
        { playlists
          .filter( playlist => playlist.name.toLowerCase().includes(filter) )
          .map( list => <li className='listItem' key={list.id} onClick={() => startPlaylist(list.uri)}>
            {list.name}
          </li>) }
      </ul>
    return ''
  }

  return (
    <div>
      <div className='filter'>
        <label>Filter:</label>
        <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <hr />
      { filteredPlayLists() }
    </div>
  )
}

export default PlayLists