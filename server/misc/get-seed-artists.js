module.exports = artistIds => {
    // Gets the frequencies of artist id's
    // ex. { 0BqRGrwqndrtNkojXiqIzL: 2, 0K4MGKGmjtdIE0W3GkGmyU: 2 }
    const artistFrequency = artistIds.reduce((result, id) => {
        result[id] = (result[id] || 1) + 1
        return result
    }, {})

    // Restructures object to make it easier for sorting
    return Object.keys(artistFrequency)
        .map(id => ({ id, count: artistFrequency[id] }))
        .sort((a, b) => b.count - a.count) // Sort from greatest to least
        .slice(0, 5) // Gets first 5 results OR all the results if there are less than 5 artists
        .map(e => e.id) // Retrieves just the id for easier query generating
}
