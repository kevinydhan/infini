import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Avatar } from 'antd'

const SideBar = props => {
    const { playlists } = props

    return (
        <Menu mode="inline" theme="dark" selectedKeys={[]}>
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
                {/* Iterate through playlists list and create a menu tab for each playlist. */}
                {playlists.map((playlist, i) => (
                    <Menu.Item key={`3--${playlist.id}`}>
                        <Avatar
                            src={playlist.image_url}
                            size="small"
                            // style={{
                            //     marginRight: '10px',
                            //     marginLeft: sidebarIsCollapsed
                            //         ? 'auto'
                            //         : '-32px'
                            // }}
                        />
                        <span>{playlist.name}</span>
                    </Menu.Item>
                ))}
            </Menu.SubMenu>
        </Menu>
    )
}

const mapStateToProps = ({ playlists }) => ({ playlists })

export default connect(mapStateToProps)(SideBar)
