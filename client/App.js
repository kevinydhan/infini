import React, { Component, Fragment } from 'react'

// Redux imports
import { connect } from 'react-redux'
import { authenticateUser } from './store/creators'

// React components
import LandingPage from './components/LandingPage'
import PlaylistMenu from './components/PlaylistMenu'

// AntDesign imports
import 'antd/dist/antd.css'

class App extends Component {
    componentDidMount() {
        this.props.authenticateUser()
    }

    render() {
        if (!this.props.userDetails.id) return <LandingPage />

        return (
            <Fragment>
                <PlaylistMenu />
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
    })
)(App)
