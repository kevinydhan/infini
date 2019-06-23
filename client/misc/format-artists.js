import React from 'react'
import linkify from './linkify'

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

export default formatArtists
