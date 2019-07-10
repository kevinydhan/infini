# infini | API Documentation

***

**GET** ``/api/me``
Returns user details

Status 200: OK
```
{
    userDetails: {
        birthdate: '1900-01-31',
        country: 'US',
        display_name: 'John Smith',
        email: 'john.smith@gmail.com',
        explicit_content: {
            filter_enabled: false,
            filter_locked: false
        },
        external_urls: {
            spotify: 'https://open.spotify.com/user/123456789',
        },
        followers: {
            href: null,
            total: 0
        },
        href: 'https://api.spotify.com/v1/users/123456789',
        id: '123456789',
        images: [
            {
                height: null,
                width: null,
                url: 'https://...'
            },
        ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:123456789'
    }
}
```

Status 404: Not found
```
{
    userDetails: undefined
}
```

***