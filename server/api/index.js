const router = require('express').Router()

router.use('/me', require('./me'))
router.use('/playlists', require('./playlists'))

module.exports = router
