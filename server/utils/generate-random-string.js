/**
 * Generates a random string of specified number of characters.
 *
 * @param {number} length - Number of characters
 */

const generateRandomString = function(length) {
    var text = ''
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

module.exports = generateRandomString
