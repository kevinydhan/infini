import React from 'react'
import { connect } from 'react-redux'
import { getPlaylistsTracks } from '../store/actions'
import { Drawer, List, Avatar } from 'antd'

const PlaylistMenu = props => {
    const { playlists, isVisible, closeDrawer, getPlaylistsTracks } = props

    // This function had to be nested inside of PlaylistMenu because AntDesign's List component would not accept React components with the connect() function called on it.

    // I would like the playlist title to render its tracks onto the left SongMenu, hence the reason why I am dispatching getPlaylistsTracks.
    const renderPlaylistItem = playlist => {
        const { name, images, tracks, external_urls } = playlist

        return (
            <List.Item>
                <List.Item.Meta
                    avatar={
                        <a href={external_urls.spotify}>
                            <Avatar src={images[0].url} />
                        </a>
                    }
                    title={
                        <a
                            onClick={() =>
                                getPlaylistsTracks(playlist.tracks.href, name)
                            }
                        >
                            {name}
                        </a>
                    }
                />
            </List.Item>
        )
    }

    // PlaylistMenu returns the following JSX
    return (
        <Drawer
            title='Playlists'
            placement='left'
            closable={false}
            visible={isVisible}
            onClose={closeDrawer}
        >
            <List
                itemLayout='horizontal'
                dataSource={playlists}
                renderItem={renderPlaylistItem}
            />
        </Drawer>
    )
}

const mapStateToProps = ({ playlists }) => ({ playlists })

const mapDispatchToProps = dispatch => ({
    getPlaylistsTracks: (trackApi, playlistTitle) =>
        dispatch(getPlaylistsTracks(trackApi, playlistTitle)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistMenu)
