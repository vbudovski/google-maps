import { z } from 'zod';

export const placesSearchStatusSchema = z
    .enum(['OK', 'ZERO_RESULTS', 'INVALID_REQUEST', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR'])
    .describe(
        'Status codes returned by service.\n- `OK` indicating the API request was successful.\n- `ZERO_RESULTS` indicating that the search was successful but returned no results. This may occur if the search was passed a `latlng` in a remote location.\n- `INVALID_REQUEST` indicating the API request was malformed, generally due to missing required query parameter (`location` or `radius`).\n- `OVER_QUERY_LIMIT` indicating any of the following:\n  - You have exceeded the QPS limits.\n  - Billing has not been enabled on your account.\n  - The monthly $200 credit, or a self-imposed usage cap, has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n  See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) for more information about how to resolve this error.\n- `REQUEST_DENIED` indicating that your request was denied, generally because:\n  - The request is missing an API key.\n  - The `key` parameter is invalid.\n- `UNKNOWN_ERROR` indicating an unknown error.\n'
    );
