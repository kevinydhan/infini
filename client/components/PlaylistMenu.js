import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Drawer, List, Avatar } from 'antd'

const PlaylistMenu = props => {
    const { playlists, isVisible, closeDrawer } = props
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
                renderItem={renderPlaylistRow}
            />
        </Drawer>
    )
}

const renderPlaylistRow = playlist => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={playlist.images[0].url} />}
                title={
                    <a onClick={() => console.log(playlist.id)}>
                        {playlist.name}
                    </a>
                }
            />
        </List.Item>
    )
}

export default connect(({ playlists }) => ({ playlists }))(PlaylistMenu)
