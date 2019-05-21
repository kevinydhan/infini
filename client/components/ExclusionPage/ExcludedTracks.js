import React from 'react'
import { connect } from 'react-redux'

import { Table, Icon } from 'antd'
import linkify from '../../misc/linkify'
import formatArtists from '../../misc/format-artists'
import formatCoverArt from '../../misc/format-cover-art'

const ExcludedTracks = props => {
    if (!props.tracks) return null

    return (
        <Table
            dataSource={formatTracks(props.tracks)}
            columns={columns}
            style={styles.borderRadius}
        />
    )
}

const styles = {
    borderRadius: { borderRadius: '2em' },
}

const columns = [
    { title: '', dataIndex: 'image', key: 'image' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    { title: '', dataIndex: 'remove', key: 'remove' },
]

const formatTracks = songs => {
    return songs.map(song => {
        return {
            key: song.id,
            image: formatCoverArt(song.album.images[0].url),
            title: linkify(song.name, song.external_urls.spotify),
            artist: formatArtists(song.artists),
            remove: formatRemoveButton(),
        }
    })
}

const formatRemoveButton = trackId => (
    <a>
        <Icon type='close' />
    </a>
)

const mapStateToProps = ({ tracks, recommendations }) => ({
    tracks,
    recommendations,
})

export default connect(mapStateToProps)(ExcludedTracks)
