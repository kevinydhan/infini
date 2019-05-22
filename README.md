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
   npm run start:dev
   ```

***

### Getting Recommendations

To retrieve recommendations that are catered towards you, infini goes through the following process:

1. A ``POST`` request is made, sending a list of songs  to ``/playlists/analyses``.

   ``/playlists/analyses`` generates a query string of track id's, which is appended to Spotify's Web API base url, as seen below:

   ``'https://api.spotify.com/v1/audio-features/?'`` + ``ids=track_id1,track_id2,track_id3...``

   This returns the audio features for each track. The features that used by infini are listed below:
  
   ```
   {
     "danceability": 0.808,
     "energy": 0.626,
     "loudness": -12.733,
     "acousticness": 0.00187,
     "instrumentalness": 0.159,
     "liveness": 0.376,
     "valence": 0.369,
     "tempo": 123.99
   }
   ```
   
   <br/>  
   
2. infini generates a query string based on the configurations set by the user. A user can specify whether they would like the ``min_``, ``max_``, and ``target_`` parameters for each feature present in the query string or not.

   An example query string would be:
   
   ``min_energy=0.0626&target_valance=0.369&max_tempo=123.99...``
   
   In addition to these parameters, infini also appends up to 5 seed artists to the query string by calculating the most frequent artists from the list of songs.
   
   <br/>   
   
3. The following API call is made using the completed query string:

   ``'https://api.spotify.com/v1/recommendations?'`` + ``seed_artists=artist_id1,artist_id2,artist_id3&min_energy=0.0626&target_valance=0.369&max_tempo=123.99...``

   <br/>  

4. The response is returned to infini.
