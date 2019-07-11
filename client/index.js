// React imports
import React, { Fragment, Component } from 'react'
import { render } from 'react-dom'

// Redux imports
import { Provider, connect } from 'react-redux'
import store from './store/store'
import { getMe } from './store/actions'

// Subcomponent imports
import Landing from './components/Landing'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import SongList from './components/SongList'

import { Layout } from 'antd'
import 'antd/dist/antd.css'

class App extends Component {
    state = {
        isLoggedIn: false,
        pageIndex: 1,
        playlistId: '',
        isSideBarCollapsed: false
    }

    handlePageChange = event => {
        const params = event.key.split('--')
        const updatedState = { pageIndex: +params[0], playlistId: '' }

        if (params.length === 2) updatedState.playlistId = params[1]

        this.setState({ ...updatedState })
    }

    toggleSideBar = () =>
        this.setState({ isSideBarCollapsed: !this.state.isSideBarCollapsed })

    async componentDidMount() {
        const user = await this.props.getMe()
        if (user) this.setState({ isLoggedIn: true })
    }

    render() {
        const { isLoggedIn, isSideBarCollapsed } = this.state
        const { pageIndex, playlistId } = this.state

        if (!isLoggedIn) return <Landing />

        return (
            <Fragment>
                <Layout>
                    {/* Render side bar */}
                    <Layout.Sider
                        trigger={null}
                        collapsed={isSideBarCollapsed}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0
                        }}
                    >
                        <SideBar />
                    </Layout.Sider>

                    <Layout
                        style={{
                            marginLeft: isSideBarCollapsed ? '80px' : '200px',
                            padding: 0
                        }}
                    >
                        {/* Render top nav bar */}
                        <Layout.Header>
                            <NavBar
                                isSideBarCollapased={isSideBarCollapsed}
                                toggleSideBar={this.toggleSideBar}
                            />
                        </Layout.Header>

                        {/* Render content */}
                        <Layout.Content>
                            <SongList />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Fragment>
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
