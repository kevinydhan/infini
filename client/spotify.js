import '@babel/polyfill'

class SpotifyPlaybackSDK {
    constructor(accessToken) {
        this.name = 'infini' // Name of your Spotify player
        this.accessToken = accessToken // Provided by Spotify's Web API

        this.deviceId = ''
    }

    // check = () => setInterval(this.create, 1000)

    check = async () => {
        return new Promise(resolve => {
            if (window.Spotify) {
                this.player = new window.Spotify.Player({
                    name: this.name,
                    getOAuthToken: callback => callback(this.accessToken),
                })

                resolve(window.Spotify)
            } else {
                window.onSpotifyWebPlaybackSDKReady = () =>
                    resolve(window.Spotify)
            }
        })
    }

    // This function will create a new Spotify Playback SDK
    create = async () => {
        await this.check()
        this.createEventHandlers()
        this.player.connect()
    }

    // Create appropriate event handlers for Playback SDK
    createEventHandlers = () => {
        this.player.on('ready', data => (this.deviceId = data.device_id))

        this.player.on('initialization.error', e => console.log(e))

        this.player.on('player_state_changed', state => {
            this.onSDKStateChange(state)
        })
    }
}

export default SpotifyPlaybackSDK
