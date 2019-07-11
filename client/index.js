// React imports
import React, { Component } from 'react'
import { render } from 'react-dom'

// Redux imports
import { Provider, connect } from 'react-redux'
import store from './store/store'
import { getMe } from './store/actions'

// Subcomponent imports
import Landing from './components/Landing'
import Navigation from './components/Navigation'
import 'antd/dist/antd.css'

class App extends Component {
    state = { isLoggedIn: false }

    async componentDidMount() {
        const user = await this.props.getMe()
        if (user) this.setState({ isLoggedIn: true })
    }

    render() {
        const { isLoggedIn } = this.state
        if (!isLoggedIn) return <Landing />
        return (
            <div>
                <Navigation />
            </div>
        )
    }
}

const ConnectedApp = connect(
    null,
    { getMe }
)(App)

render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('app')
)
