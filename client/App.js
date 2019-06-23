import '@babel/polyfill'
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUserPlaylists } from './store/actions'

import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import PlaylistMenu from './components/PlaylistMenu'

import getTokens from './modules/spotify/utils/get-tokens'
import { Spotify } from './modules'

// AntDesign imports
import 'antd/dist/antd.css'

class App extends Component {
    state = {
        isLoggedIn: false,
        drawerVisibility: false
    }

    // Functions to toggle playlist drawer
    openDrawer = () => this.setState({ drawerVisibility: true })
    closeDrawer = () => this.setState({ drawerVisibility: false })

    async componentDidMount() {
        await getTokens()
        if (Spotify.getAccessToken()) {
            this.props.getPlaylists()
            this.setState({ isLoggedIn: true })
        }
    }

    render() {
        const { state, openDrawer, closeDrawer } = this
        const { isLoggedIn, drawerVisibility } = state

        if (!isLoggedIn) return <Landing />

        return (
            <div>
                <NavBar openDrawer={openDrawer} />
                <PlaylistMenu
                    isVisible={drawerVisibility}
                    closeDrawer={closeDrawer}
                />

                {/* App routes */}
                <Route exact path="/" component={Dashboard} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getPlaylists: () => dispatch(getUserPlaylists())
})

export default connect(
    null,
    mapDispatchToProps
)(App)
