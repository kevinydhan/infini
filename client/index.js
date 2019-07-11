import React, { Component } from 'react'
import { render } from 'react-dom'

import Landing from './components/Landing'
import 'antd/dist/antd.css'

import axios from 'axios'

class App extends Component {
    state = {
        isLoggedIn: false
    }

    async componentDidMount() {
        const response = await axios.get('/api/me')
        if (response.data.user_details) {
            const playlists = await axios.get('/api/me/playlists')
            console.log(playlists.data.items)
            this.setState({ isLoggedIn: true })
        }
    }

    render() {
        const { isLoggedIn } = this.state
        if (!isLoggedIn) return <Landing />
        return <div>hi</div>
    }
}

render(<App />, document.getElementById('app'))
