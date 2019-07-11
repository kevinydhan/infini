# infini | API Documentation

**GET** ``/api/me``

- Gets user details from Spotify Web API

**Status 200:** OK
```javascript
{
    user_details: {
        id: '123456789',
        type: 'user',
        product: 'premium',
        country: 'US',
        birthdate: '1900-01-31',
        display_name: 'John Smith',
        email: 'john.smith@gmail.com',
        uri: 'spotify:user:123456789',
        href: 'https://api.spotify.com/v1/users/123456789',
        followers: {
            href: null,
            total: 0
        },
        external_urls: {
            spotify: 'https://open.spotify.com/user/123456789',
        },
        explicit_content: {
            filter_enabled: false,
            filter_locked: false
        },
        images: [
            {
                height: null,
                width: null,
                url: 'https://...'
            }
        ]
    }
}
```

**Status 404:** Not found
```javascript
{
    user_details: undefined
}
```

***

**GET** ``/api/me/playlists``

- Gets user's playlists and their tracks from Spotify API

**Status 200:** OK

```javascript
[
    {
        collaborative: false,
        external_urls: {

        },
        href: 'https://api.spotify.com/v1/playlists/your_playlist_id',
        id: 'your_playlist_id',
        images: [
        
        ],
        name: 'Playlist 1',
        owner: {
            
        },
        primary_color: null,
        public: false,
        snapshot_id: 'your_playlist_snapshot_id',
        tracks: {
            href: 
        },
        type: 'playlist',
        uri: 'spotify:playlist:your_playlist_id'
    },
    {
        ...
    }
]
```
