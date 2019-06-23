import '@babel/polyfill'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './components/Landing'
import Dashboard from './components/Dashboard'

import getTokens from './utils/get-tokens'
import { Spotify } from './modules'

// AntDesign imports
import 'antd/dist/antd.css'

class App extends Component {
    state = {
        isLoggedIn: false
    }

    async componentDidMount() {
        await getTokens()
        if (Spotify.getAccessToken()) this.setState({ isLoggedIn: true })
    }

    render() {
        const { isLoggedIn } = this.state

        if (!isLoggedIn) return <Landing />

        return (
            <div>
                <Dashboard />
            </div>
        )
    }
}

export default App
