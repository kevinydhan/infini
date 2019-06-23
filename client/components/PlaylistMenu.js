import React from 'react'

import { connect } from 'react-redux'
import { getPlaylistsTracks } from '../store/actions'

import { Drawer, List, Avatar } from 'antd'

const PlaylistMenu = props => {
    const { playlists, isVisible, closeDrawer, getPlaylistsTracks } = props

    /**
     * Renders a playlist item.
     * @param {string} name - Name of playlist
     * @param {Array<Object>} images - Array of JS objects containing image details
     * @param {Object} external_urls - JS object containing urls to redirect user to Spotify Web Player
     */

    const renderPlaylistItem = playlist => {
        const { name, images, external_urls } = playlist

        const avatar = (
            <a href={external_urls.spotify}>
                <Avatar src={images[0].url} />
            </a>
        )
        const title = (
            <a onClick={() => getPlaylistsTracks(playlist.tracks.href, name)}>
                {name}
            </a>
        )

        return (
            <List.Item>
                <List.Item.Meta avatar={avatar} title={title} />
            </List.Item>
        )
    }

    // PlaylistMenu returns the following JSX
    return (
        <Drawer
            title="Playlists"
            placement="left"
            closable={false}
            visible={isVisible}
            onClose={closeDrawer}
        >
            <List
                itemLayout="horizontal"
                dataSource={playlists}
                renderItem={renderPlaylistItem}
            />
        </Drawer>
    )
}

const mapStateToProps = ({ playlists }) => ({ playlists })

const mapDispatchToProps = dispatch => ({
    getPlaylistsTracks: (trackApi, playlistTitle) =>
        dispatch(getPlaylistsTracks(trackApi, playlistTitle))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistMenu)
