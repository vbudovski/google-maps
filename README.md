# Google Maps Platform API

A TypeScript-typed and runtime-validated Google Maps Platform API. The requests and responses are validated
using [Zod](https://zod.dev/) and based on
the [OpenAPI specification](https://github.com/googlemaps/openapi-specification).

---
**⚠ Warning**: This library is for **server-side applications only**. Do *not* use it for client-side applications to
prevent your API key from leaking &mdash; use one of the client-side libraries instead.

---

The current list of supported APIs:

* [Directions API](https://developers.google.com/maps/documentation/directions)
* [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix)
* [Elevation API](https://developers.google.com/maps/documentation/elevation)
* [Geocoding API](https://developers.google.com/maps/documentation/geocoding)
* [Geolocation API](https://developers.google.com/maps/documentation/geolocation)
* [Places API](https://developers.google.com/maps/documentation/places/web-service)
* [Roads API](https://developers.google.com/maps/documentation/roads)
* [Street View API](https://developers.google.com/maps/documentation/streetview)
* [Time Zone API](https://developers.google.com/maps/documentation/timezone/overview)

## Installation

```bash
pnpm add @vbudovski/google-maps
```

## Development

### Getting started

Install the dependencies:

```bash
nvm use
pnpm install
```

Copy the sample environment variables file `env.sample` to `.env` and set the required variables. `GOOGLE_MAPS_API_KEY`
must be set in order to run the tests.

### Building the library

```bash
pnpm build
```

### Running tests

```bash
pnpm test
```

### Updating the APIs

When a new version of the OpenAPI schema is released, it is necessary to re-generate the schemas and expose the exports
for use.

1. Generate the new Zod schemas and fetch functions:
    ```bash
    pnpm generate
    ```

2. Export the new functions from a module in `src/api`. Be sure to follow existing patterns.
3. Add a test module in `src/test`. The name should match that of the API export module.
