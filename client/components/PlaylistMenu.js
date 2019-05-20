import React from 'react'
import { connect } from 'react-redux'

const PlaylistMenu = props => {
    const { playlists } = props
    return (
        <ul>
            {playlists.map(p => (
                <li key={p.id}>{p.name}</li>
            ))}
        </ul>
    )
}

export default connect(({ playlists }) => ({ playlists }))(PlaylistMenu)
