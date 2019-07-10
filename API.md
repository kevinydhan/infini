# infini | API Documentation

**GET** ``/api/me``

Returns user details

**Status 200:** OK
```
{
    userDetails: {
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
```
{
    userDetails: undefined
}
```

***
