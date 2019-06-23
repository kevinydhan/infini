import React from 'react'

/**
 * Renders an `<a>` element with the `href` directing to specified url. The link color defaults to black.
 * @param {string} text - Display text
 * @param {string} url - Href for `<a>` element
 */

const linkify = (text, url) => (
    <a href={url} style={styles.link} target="_blank">
        {text}
    </a>
)

const styles = {
    link: { color: 'black' }
}

export default linkify
