import React from 'react'
import { connect } from 'react-redux'
import { getRecommendations } from '../store/actions'
import { Menu, Icon } from 'antd'

const NavBar = props => {
    const { openDrawer, getRecommendations } = props

    return (
        <Menu mode='horizontal' selectedKeys={[]}>
            <Menu.Item key='playlists-menu' onClick={openDrawer}>
                <Icon type='menu' />
            </Menu.Item>

            <Menu.Item key='get-recommendations' onClick={getRecommendations}>
                <Icon type='sync' />
            </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = ({ tracks, recommendations }) => ({
    tracks,
    recommendations,
})

const mapDispatchToProps = (dispatch, props) => ({
    getRecommendations: () => dispatch(getRecommendations()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)
