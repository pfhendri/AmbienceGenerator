Auth
* https://accounts.spotify.com/authorize
* scopes
  * "playlist-read-private"
  * "user-read-email"
  * "user-modify-playback-state"
* redirect_uri
  * http://localhost:3000
* endpoint
  * `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`

Playlist
* https://api.spotify.com/v1/me/playlists
* get
* Authorization Bearer token

