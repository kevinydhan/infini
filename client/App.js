import React, { Component, Fragment } from 'react'

// Redux imports
import { connect } from 'react-redux'
import { authenticateUser } from './store/actions'
import { updateCurrentSong } from './store/actions'

// React components
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import PlaylistMenu from './components/PlaylistMenu'
import SongMenu from './components/SongMenu'

// AntDesign imports
import 'antd/dist/antd.css'
import { Row, Col } from 'antd'

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
                name: 'Infini',
                getOAuthToken: callback =>
                    callback(this.props.userDetails.accessToken),
            })

            this.createSDKEventHandlers()

            this.player.connect()
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
        if (!this.props.userDetails.id) return <LandingPage />
        if (!this.player) this.checkForPlayer()

        const { state, props, openDrawer, closeDrawer } = this
        const { tracks, playlistTitle, recommendations } = props

        return (
            <Fragment>
                <NavBar openDrawer={openDrawer} player={this.player} />
                <PlaylistMenu
                    isVisible={state.drawerVisibility}
                    closeDrawer={closeDrawer}
                />

                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Renders out top tracks or tracks from selected playlist */}
                    <Col span={11}>
                        <SongMenu tracks={tracks} title={playlistTitle} />
                    </Col>
                    <Col span={1} />
                    {/* Renders out recommended tracks */}
                    <Col span={11}>
                        <SongMenu
                            tracks={recommendations}
                            title={'Recommendations'}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default connect(
    // Maps state to props
    ({ userDetails, tracks, playlistTitle, recommendations }) => ({
        userDetails,
        tracks,
        playlistTitle,
        recommendations,
    }),

    // Maps dispatch to props
    dispatch => ({
        authenticateUser: () => dispatch(authenticateUser()),
        updateCurrentSong: currentTrack =>
            dispatch(updateCurrentSong(currentTrack)),
    })
)(App)
