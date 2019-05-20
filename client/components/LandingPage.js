import React from 'react'
import { Button } from 'antd'

const LandingPage = () => {
    return (
        <div>
            <a href='/login'>
                <Button type='primary' shape='round' size='large'>
                    Log in with Spotify
                </Button>
            </a>
        </div>
    )
}

export default LandingPage
