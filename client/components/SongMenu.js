import React from 'react'
import { connect } from 'react-redux'
import { Table, Typography } from 'antd'

// This array is used to define the SongMenu table with AntDesign.
const columns = [
    { title: '', dataIndex: 'play', key: 'play' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
]

// SongMenu component
const SongMenu = props => {
    if (!props.tracks) return null
    const { tracks, renderTitle } = props

    return (
        <Table
            dataSource={formatSongs(tracks)}
            columns={columns}
            title={renderTitle}
            // pagination={false}
        />
    )
}

// The below function is used to restructure the Spotify song object so that it fits AntDesign's table component.
const formatSongs = songs => {
    return songs.map(song => {
        return {
            key: song.id,
            title: linkify(song.name, song.external_urls.spotify),
            artist: formatArtists(song.artists),
        }
    })
}

// The below function is used to create individual external Spotify links for each artist.
const formatArtists = artists => {
    return artists.map((artist, index, array) => (
        <span key={artist.id}>
            {linkify(artist.name, artist.external_urls.spotify)}

            {/* Displays 'ft.' if there is more than one artist */}
            {index === 0 && array.length > 1 ? <span>{' ft. '}</span> : null}

            {/* Displays commas for every artist after the first */}
            {index !== 0 && index !== array.length - 1 ? (
                <span>{', '}</span>
            ) : null}
        </span>
    ))
}

const linkify = (text, url) => (
    <a href={url} style={{ color: 'black' }}>
        {text}
    </a>
)

const mapStateToProps = (state, props) => ({
    renderTitle: () => (
        <div style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>{props.title}</Typography.Title>
        </div>
    ),
})

export default connect(mapStateToProps)(SongMenu)
