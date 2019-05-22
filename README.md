# infini | *Unlimited Song Recommendations*
**Disclaimer:** We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Spotify, or any of its subsidiaries or its affiliates.

***

### Features

- Get *potentially* unlimited song recommendations using Spotify's Web API

- Manage your excluded tracks, artists, and genres to refine your search for new music

- Manage additional recommendation query parameters for further refination

- Create new playlists containing your new finds

- Listen to your favorite tracks right in the browser

***

### Setup

1. Fork and clone this repository.
```
git clone https://github.com/ydhan18/infini.git
```

2. Change into the directory ``infini`` and install dependencies.
```
npm install
```

3. ~~Start the application.~~

   You currently cannot run the development server because the client id and secret are not provided.

```
~~npm run start:dev~~
```

***

### Getting Recommendations

To retrieve recommendations that are catered towards you, infini goes through the following process:

1. A list of songs is sent to:

   ``'https://api.spotify.com/v1/audio-features/?'`` + ``id1,id2,id3...``

