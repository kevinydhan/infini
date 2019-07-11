import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Avatar } from 'antd'

const Navigation = props => {
    const { playlists } = props

    // Manages open/closed state of sidebar
    const [sidebarIsCollapsed, setSidebarIsCollapsed] = useState(true)

    // Toggles sidebar visibility when menu button is clicked
    const toggleSidebarCollapse = () =>
        setSidebarIsCollapsed(!sidebarIsCollapsed)

    return (
        <div>
            {/* Top, horizontal navigation bar */}
            <Menu mode="horizontal">
                <Menu.Item onClick={toggleSidebarCollapse}>
                    <Icon
                        type={sidebarIsCollapsed ? 'menu-unfold' : 'menu-fold'}
                        style={{ marginLeft: '13px' }}
                    />
                </Menu.Item>
            </Menu>

            {/* Left, vertical sidebar */}
            <Menu
                mode="inline"
                inlineCollapsed={sidebarIsCollapsed}
                style={{ width: sidebarIsCollapsed ? '80px' : '165px' }}
            >
                {/* Exclusions dropdown menu */}
                <Menu.SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="frown" />
                            <span>Exclusions</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">Tracks</Menu.Item>
                    <Menu.Item key="2">Artists</Menu.Item>
                </Menu.SubMenu>

                {/* Playlists dropdown menu */}
                <Menu.SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="play-circle" />
                            <span>Playlists</span>
                        </span>
                    }
                >
                    {playlists.map((playlist, i) => (
                        <Menu.Item key={i + 3}>
                            <Avatar
                                src={playlist.image_url}
                                style={{ marginRight: '10px' }}
                            />
                            <span>{playlist.name}</span>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
        </div>
    )
}

const mapStateToProps = ({ playlists }) => ({ playlists })

export default connect(mapStateToProps)(Navigation)
