import React from 'react'
import { Button } from 'antd'

const styles = {
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#1DB954',
        color: '#FFFFFF',
        borderColor: '0px',
        fontSize: '1.5em',
        height: '8vh',
        width: '20vw',
    },
}

const LandingPage = () => {
    return (
        <div style={styles.root}>
            <a href='/login'>
                <Button shape='round' size='large' style={styles.loginButton}>
                    Log In with Spotify
                </Button>
            </a>
        </div>
    )
}

export default LandingPage
