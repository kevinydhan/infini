import React from 'react'
import { connect } from 'react-redux'
import { getRecommendations } from '../store/actions'
import { Menu, Icon, Avatar } from 'antd'

const styles = {
    iconSize1: { fontSize: '18px' },
    iconSize2: { fontSize: '20px' },
    left: { float: 'left' },
    right: { float: 'right' },
    paddingLeft: { paddingLeft: '1em' },
}

const NavBar = props => {
    const { currentTrack, openDrawer, getRecommendations } = props

    return (
        <Menu
            mode='horizontal'
            selectedKeys={[]}
            style={{ textAlign: 'center' }}
        >
            {/* Toggle playlist drawer button */}
            <Menu.Item
                key='playlists-menu'
                style={styles.left}
                onClick={openDrawer}
            >
                <Icon type='menu' style={styles.iconSize1} />
            </Menu.Item>

            {/* Go to exclusions page button */}
            <Menu.Item key='manage-exclusions' style={styles.left}>
                <Icon type='stop' style={styles.iconSize1} />
            </Menu.Item>

            {/* Media control buttons*/}
            <Menu.Item>
                <Icon type='fast-backward' style={styles.iconSize1} />
            </Menu.Item>

            <Menu.Item>
                <Icon type='caret-right' style={styles.iconSize1} />
            </Menu.Item>

            <Menu.Item>
                <Icon type='fast-forward' style={styles.iconSize1} />
            </Menu.Item>

            {/* Album cover */}

            {Object.keys(currentTrack).length ? (
                <Menu.Item>
                    <Avatar
                        shape='square'
                        src={currentTrack.album.images[0].url}
                    />
                    <span style={styles.paddingLeft}>
                        {currentTrack.name} - {currentTrack.artists[0].name}
                    </span>
                </Menu.Item>
            ) : (
                <Menu.Item>
                    <Avatar shape='square' />
                    <span style={styles.paddingLeft}>
                        Current Song - Current Artist
                    </span>
                </Menu.Item>
            )}

            {/* New finds button */}
            <Menu.Item key='new-finds' style={styles.right}>
                <Icon type='play-square' style={styles.iconSize2} />
            </Menu.Item>

            {/* Get recommendations button */}
            <Menu.Item
                key='get-recommendations'
                style={styles.right}
                onClick={getRecommendations}
            >
                <Icon type='sync' style={styles.iconSize1} />
            </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = ({ currentTrack }) => ({ currentTrack })

const mapDispatchToProps = dispatch => ({
    getRecommendations: () => dispatch(getRecommendations()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)
