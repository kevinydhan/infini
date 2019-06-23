import React from 'react'
import { Button, Divider } from 'antd'

const Landing = () => {
    return (
        <div style={styles.root}>
            <div style={styles.title}>infini</div>

            <Divider style={styles.divider} />

            <a href="/login">
                <Button shape="round" style={styles.loginButton}>
                    Log In with Spotify
                </Button>
            </a>
        </div>
    )
}

// I should probably migrate this to Sass...
const spotifyGreen = '#1DB954'

const styles = {
    root: {
        backgroundImage:
            'url(https://i.ytimg.com/vi/72XKJyuuUAQ/maxresdefault.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: '100% auto',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Rubik'
    },
    loginButton: {
        backgroundColor: spotifyGreen,
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '20px',
        height: '55px',
        width: '220px'
    },
    title: {
        padding: '0',
        margin: '0',
        fontSize: '130px',
        letterSpacing: '12px',
        color: 'white',
        textShadow: `0px 30px 30px black`
    },
    divider: {
        backgroundColor: '#262626',
        marginBottom: '60px'
    }
}

export default Landing
