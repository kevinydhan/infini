import React, { Component, Fragment } from 'react'

// Redux imports
import { connect } from 'react-redux'
import { authenticateUser } from './store/creators'

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
        drawerVisibility: false,
    }

    // Functions to toggle playlist drawer
    openDrawer = () => this.setState({ drawerVisibility: true })
    closeDrawer = () => this.setState({ drawerVisibility: false })

    // Retrieves user details, playlists, and top tracks
    componentDidMount() {
        this.props.authenticateUser()
    }

    render() {
        if (!this.props.userDetails.id) return <LandingPage />
        const { state, props, openDrawer, closeDrawer } = this
        const { tracks, playlistTitle, recommendations } = props

        return (
            <Fragment>
                <NavBar openDrawer={openDrawer} />
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
    })
)(App)
