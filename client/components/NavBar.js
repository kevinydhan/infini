import React, { useState } from 'react'
import { Menu, Icon } from 'antd'

const NavBar = props => {
    const { isSideBarCollapsed, toggleSideBar } = props

    return (
        <Menu
            mode="horizontal"
            theme="dark"
            selectedKeys={[]}
            style={{ height: '100%', width: '100%', alignItems: 'center' }}
        >
            <Menu.Item onClick={toggleSideBar}>
                <Icon type={isSideBarCollapsed ? 'menu-unfold' : 'menu-fold'} />
            </Menu.Item>
        </Menu>
    )
}

export default NavBar
