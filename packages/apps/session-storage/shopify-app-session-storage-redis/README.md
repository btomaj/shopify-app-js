# Session Storage Adapter for Redis

This package implements the `SessionStorage` interface that works with an instance of [Redis](https://redis.io/).

You can create an instance of `RedisSessionStorage` in several ways:

## Using a connection URL

```js
import {shopifyApp} from '@shopify/shopify-app-express';
import {RedisSessionStorage} from '@shopify/shopify-app-session-storage-redis';

const shopify = shopifyApp({
  sessionStorage: new RedisSessionStorage(
    'redis://username:password@host/database',
  ),
  // ...
});
```

## Using a URL object

```js
const shopify = shopifyApp({
  sessionStorage: new RedisSessionStorage(
    new URL('redis://username:password@host/database'),
  ),
  // ...
});
```

## Using credential components

```js
const shopify = shopifyApp({
  sessionStorage: RedisSessionStorage.withCredentials(
    'host.com',
    'thedatabase',
    'username',
    'password',
  ),
  // ...
});
```

## Using a RedisClient instance

> [!NOTE]
> Remember that `RedisSessionStorage` will connect to the database, but won't disconnect from it.
> If you need to restart the connection, you'll need to manually connect again for the storage to continue working.

```js
import {RedisClientOptions, createClient} from 'redis';
const client = createClient({url: 'redis://username:password@host/database'});

const shopify = shopifyApp({
  sessionStorage: new RedisSessionStorage(client),
  // ...
});
```

If you prefer to use your own implementation of a session storage mechanism that is compatible with the `@shopify/shopify-app-express` package, see the [implementing session storage guide](../shopify-app-session-storage/implementing-session-storage.md).
