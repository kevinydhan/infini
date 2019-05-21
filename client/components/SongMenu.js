import React from 'react'
import { connect } from 'react-redux'
import { Table, Typography, Icon } from 'antd'

import linkify from '../misc/linkify'
import formatArtists from '../misc/format-artists'

// SongMenu component
const SongMenu = props => {
    if (!props.tracks) return null
    const { tracks, renderTitle } = props

    return (
        <Table
            // formatSongs() will reformat Spotify's tracks array of objects to be used in AntDesign's dataSource parameter.
            dataSource={formatTracks(tracks)}
            columns={columns}
            title={renderTitle}
            style={styles.borderRadius}
            // pagination={false}
        />
    )
}

// Style parameters to be used in React components
const styles = {
    borderRadius: { borderRadius: '2em' },
    title: { textAlign: 'center' },
    link: { color: 'grey' },
}

// This array is used to define the SongMenu table with AntDesign.
const columns = [
    { title: '', dataIndex: 'play', key: 'play' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
]

// The below function is used to restructure the Spotify song object so that it fits AntDesign's table component.
const formatTracks = songs => {
    return songs.map(song => {
        return {
            key: song.id,
            play: formatPlay(),
            title: linkify(song.name, song.external_urls.spotify),
            artist: formatArtists(song.artists),
        }
    })
}

// The below function is used to create a play button for the song.
const formatPlay = () => (
    <a style={styles.link}>
        <Icon type='caret-right' />
    </a>
)

const mapStateToProps = (state, props) => ({
    renderTitle: () => (
        <div style={styles.title}>
            <Typography.Title level={4}>{props.title}</Typography.Title>
        </div>
    ),
})

export default connect(mapStateToProps)(SongMenu)
