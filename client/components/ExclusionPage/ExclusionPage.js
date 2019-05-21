import React, { useState } from 'react'

import { connect } from 'react-redux'

import ExcludedTracks from './ExcludedTracks'
import ExcludedArtists from './ExcludedArtists'
import ExcludedGenres from './ExcludedGenres'

import { Row, Col, Button, Divider } from 'antd'

const styles = {
    headers: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1em 0',
    },
    button: {},
}

const ExclusionPage = props => {
    const [selected, setSelected] = useState('Tracks')

    return (
        <div>
            {/* Navigation buttons */}
            <Row style={styles.headers}>
                <Col span={6}>
                    <Button.Group>
                        <Button onClick={() => setSelected('Tracks')}>
                            Tracks
                        </Button>

                        <Button onClick={() => setSelected('Artists')}>
                            Artists
                        </Button>

                        <Button onClick={() => setSelected('Genres')}>
                            Genres
                        </Button>
                    </Button.Group>
                </Col>
                <Col span={18} />
            </Row>

            <Divider>Excluded {selected}</Divider>

            <Row>
                <Col>
                    {selected === 'Tracks' && <ExcludedTracks />}
                    {selected === 'Artists' && <ExcludedArtists />}
                    {selected === 'Genres' && <ExcludedGenres />}
                </Col>
            </Row>
        </div>
    )
}

export default connect()(ExclusionPage)
