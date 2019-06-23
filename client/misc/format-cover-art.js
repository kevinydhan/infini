import React from 'react'
import { Avatar } from 'antd'

/**
 * Renders AntDesign's `<Avatar>` element containing album cover art.
 * @param {string} imageUrl - Image url provided by Spotify API
 */

const formatCoverArt = imageUrl => <Avatar shape="square" src={imageUrl} />

export default formatCoverArt
