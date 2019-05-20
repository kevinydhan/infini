const config = require('../spotify.config')

module.exports = analyzedTracks => {
    const { market, recommendations } = config
    const { limit, queries } = recommendations
    const result = {}

    // Iterate through each of the track's attribute
    Object.keys(queries).forEach(subquery => {
        // Iterate through min, max, and target to see if we should query it

        queries[subquery]['min']
            ? (result[`min_${subquery}`] = Math.min(
                  ...analyzedTracks.map(t => t[subquery])
              ))
            : null

        queries[subquery]['max']
            ? (result[`max_${subquery}`] = Math.max(
                  ...analyzedTracks.map(t => t[subquery])
              ))
            : null

        queries[subquery]['target']
            ? (result[`target_${subquery}`] =
                  analyzedTracks
                      .map(t => t[subquery]) // Isolates subquery value
                      .reduce((a, b) => a + b, 0) / analyzedTracks.length)
            : null
    })

    market ? (result['market'] = market) : 'US'

    limit // Set limit parameter
        ? (result['limit'] = limit)
        : (result['limit'] = 20)

    return result
}
