import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// Redux imports
import { connect } from 'react-redux'
import { authenticateUser } from './store/actions'
import { updateCurrentSong } from './store/actions'

// React components
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import PlaylistMenu from './components/PlaylistMenu'
import Dashboard from './components/Dashboard'
import ExclusionPage from './components/ExclusionPage/ExclusionPage'

// AntDesign imports
import 'antd/dist/antd.css'

class App extends Component {
    state = {
        deviceId: '',
        drawerVisibility: false,
        trackId: '',
        trackName: '',
    }

    // Functions to toggle playlist drawer
    openDrawer = () => this.setState({ drawerVisibility: true })
    closeDrawer = () => this.setState({ drawerVisibility: false })

    // This function will instantiate new Playback SDK
    checkForPlayer = () => {
        if (window.Spotify) {
            this.player = new window.Spotify.Player({
                name: 'infini',
                getOAuthToken: callback =>
                    callback(this.props.userDetails.accessToken),
            })

            this.createSDKEventHandlers()

            this.player.connect()
            console.log('connected')
        }
    }

    // Create appropriate event handlers for Playback SDK
    createSDKEventHandlers = () => {
        this.player.on('initialization.error', e => console.log(e))

        this.player.on('player_state_changed', state => {
            this.onSDKStateChange(state)
        })

        this.player.on('ready', data =>
            this.setState({ deviceId: data.device_id })
        )
    }

    onSDKStateChange = state => {
        if (!state) return
        const {
            current_track,
            next_tracks,
            previous_tracks,
        } = state.track_window

        this.props.updateCurrentSong(current_track)
    }

    // Retrieves user details, playlists, and top tracks
    componentDidMount() {
        this.props.authenticateUser()
    }

    render() {
        // return <LandingPage />
        if (!this.props.userDetails.id) return <LandingPage />
        if (!this.player) this.checkForPlayer()

        // check(this.checkForPlayer)

        const { state, openDrawer, closeDrawer } = this

        return (
            <Fragment>
                <NavBar openDrawer={openDrawer} player={this.player} />
                <PlaylistMenu
                    isVisible={state.drawerVisibility}
                    closeDrawer={closeDrawer}
                />

                {/* App routes */}
                <Route path='/exclusions' component={ExclusionPage} />

                <Route exact path='/' component={Dashboard} />
            </Fragment>
        )
    }
}

export default connect(
    // Maps state to props
    ({ userDetails }) => ({ userDetails }),

    // Maps dispatch to props
    dispatch => ({
        authenticateUser: () => dispatch(authenticateUser()),
        updateCurrentSong: currentTrack =>
            dispatch(updateCurrentSong(currentTrack)),
    })
)(App)
