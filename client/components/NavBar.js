import React from 'react'
import { Menu, Icon } from 'antd'

const NavBar = props => {
    const { openDrawer } = props

    return (
        <Menu>
            <Menu.Item key='Playlists'>
                <Icon type='menu' onClick={openDrawer} />
            </Menu.Item>
        </Menu>
    )
}

export default NavBar
