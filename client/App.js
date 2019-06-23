import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/Login'
import { Spotify } from './modules'

// AntDesign imports
import 'antd/dist/antd.css'

class App extends Component {
    componentDidMount() {
        Spotify.getMe()
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Landing} />
            </Switch>
        )
    }
}

export default App
