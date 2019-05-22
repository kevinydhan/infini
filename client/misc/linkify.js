import React from 'react'

const linkify = (text, url) => (
    <a href={url} style={styles.link} target='_blank'>
        {text}
    </a>
)

const styles = {
    link: { color: 'black' },
}

export default linkify
