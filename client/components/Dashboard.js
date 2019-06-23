import React from 'react'
import { connect } from 'react-redux'

import SongMenu from './SongMenu'

import { Row, Col } from 'antd'

const Dashboard = props => {
    const { tracks, playlistTitle, recommendations } = props

    return (
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Renders out top tracks or tracks from selected playlist */}
            <Col span={11}>
                <SongMenu tracks={tracks} title={playlistTitle} />
            </Col>

            <Col span={1} />

            {/* Renders out recommended tracks */}
            <Col span={11}>
                {/* <SongMenu tracks={recommendations} title={'Recommendations'} /> */}
            </Col>
        </Row>
    )
}

const mapStateToProps = ({ tracks, playlistTitle }) => ({
    tracks,
    playlistTitle
})

export default connect(mapStateToProps)(Dashboard)
