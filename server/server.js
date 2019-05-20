const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log(`Listening on port: ${3000}\n\nUrl: http://localhost:${port}\n`)
)
