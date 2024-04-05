import { z } from 'zod';

export const placesDetailsStatusSchema = z
    .enum(['OK', 'ZERO_RESULTS', 'INVALID_REQUEST', 'NOT_FOUND', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR'])
    .describe(
        'Status codes returned by service.\n- `OK` indicating the API request was successful.\n- `ZERO_RESULTS` indicating that the referenced location, `place_id`, was valid but no longer refers to a valid result. This may occur if the establishment is no longer in business. \n- `NOT_FOUND` indicating that that the referenced location, `place_id`, was not found in the Places database. \n- `INVALID_REQUEST` indicating the API request was malformed.\n- `OVER_QUERY_LIMIT` indicating any of the following:\n  - You have exceeded the QPS limits.\n  - Billing has not been enabled on your account.\n  - The monthly $200 credit, or a self-imposed usage cap, has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n  See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) for more information about how to resolve this error.\n- `REQUEST_DENIED` indicating that your request was denied, generally because:\n  - The request is missing an API key.\n  - The `key` parameter is invalid.\n- `UNKNOWN_ERROR` indicating an unknown error.\n'
    );
