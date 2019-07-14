import React, { useEffect, useState } from 'react'
import './Controls.css'

// https://developer.spotify.com/documentation/web-playback-sdk/reference/

const Controls = ({device}) => {
  const [track, setTrack] = useState(null)
  useEffect( () => {
    if(device){
      device.addListener('player_state_changed', ({
        track_window: { current_track }
      }) => {
        setTrack(current_track)
      });
  
      return () => {
        device.removeListener('player_state_changed')
      }
    }
  }, [device])

  const play = () => {
    device.resume()
  }

  const pause = () => {
    device.pause()
  }

  const prev = () => {
    device.previousTrack()
  }

  const next = () => {
    device.nextTrack()
  }

  return (
    <div className='Controls'>
      { track && <div className='TrackInfo'>{track.name}</div> }
      <div className='ControllerHolder'>
        <button onClick={prev}>Prev</button>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default Controls