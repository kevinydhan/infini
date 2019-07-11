const { promisifyAll } = require('bluebird')
const redis = require('redis')

// Use Bluebird to promisify Redis
promisifyAll(redis)

// Create Redis client
const client = redis.createClient()

client.on('connect', () => console.log('Redis has connected on PORT:6379.'))
client.on('error', err => console.log(err))

client.hmsetAsync('123', 'name', 'Bob')

module.exports = client
