const path = require('path')
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const request = require('request')
const session = require('express-session')
const express = require('express')
const app = express()

const generateRandomString = require('./utils/generate-random-string')
const { stateKey, scope, sessionCreds } = require('./server.creds')
require('dotenv').config()

// Express middleware
app.use(express.static('public'))
    .use(express.json())
    .use(cookieParser())
    .use(cors())
    .use(session(sessionCreds))

// Render index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/login', (req, res) => {
    const state = generateRandomString(16)
    res.cookie(stateKey, state)

    const url =
        'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: req.protocol + '://' + req.get('host') + '/callback',
            state: state
        })

    res.redirect(url)
})

app.get('/callback', (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
        res.redirect(
            '/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                })
        )
    } else {
        res.clearCookie(stateKey)

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri:
                    req.protocol + '://' + req.get('host') + '/callback',
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(
                        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                    ).toString('base64')
            },
            json: true
        }

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token

                req.session.accessToken = access_token
                req.session.refreshToken = refresh_token

                res.redirect('/')
            } else {
                res.redirect(
                    '/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        })
                )
            }
        })
    }
})

app.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token

    const refresh_token = req.query.refresh_token
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization:
                'Basic ' +
                new Buffer(
                    process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                ).toString('base64')
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    }

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token
            res.send({
                access_token: access_token
            })
        }
    })
})

app.get('/tokens', (req, res) => {
    res.json({
        accessToken: req.session.accessToken,
        refreshToken: req.session.refreshToken
    })
})

module.exports = app
