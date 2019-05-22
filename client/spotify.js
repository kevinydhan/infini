class SpotifyPlaybackSDK {
    name = 'infini' // Name of your Spotify player
    deviceId = ''

    check = () => setInterval(this.create, 3000)

    // This function will create a new Spotify Playback SDK
    create = () => {
        if (window.Spotify) {
            clearInterval(this.check)
            this.player = new window.Spotify.Player({
                name: this.name,
                getOAuthToken: callback =>
                    callback(this.props.userDetails.accessToken),
            })

            this.createSDKEventHandlers()

            this.player.connect()
            console.log('connected')
        }
    }
}

const spotify = new SpotifyPlaybackSDK()

export default spotify
