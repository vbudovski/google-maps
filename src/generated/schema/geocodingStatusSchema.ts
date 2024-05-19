import { z } from 'zod';

/**
 * @description The `status` field within the Geocoding response object contains the status of the request, and may contain debugging information to help you track down why geocoding is not working. The \"status\" field may contain the following values:\n\n- `OK` indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned.\n- `ZERO_RESULTS` indicates that the geocode was successful but returned no results. This may occur if the geocoder was passed a non-existent address or a `latlng` in a remote location.\n- `OVER_DAILY_LIMIT` indicates any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n- `OVER_QUERY_LIMIT` indicates that you are over your quota.\n- `REQUEST_DENIED` indicates that your request was denied.\n- `INVALID_REQUEST` generally indicates that the query (address, components, or latlng) is missing.\n- `UNKNOWN_ERROR` indicates that the request could not be processed due to a server error. The request may succeed if you try again.\n
 */
export const geocodingStatusSchema = z
    .enum([
        'OK',
        'INVALID_REQUEST',
        'OVER_DAILY_LIMIT',
        'OVER_QUERY_LIMIT',
        'REQUEST_DENIED',
        'UNKNOWN_ERROR',
        'ZERO_RESULTS',
    ])
    .describe(
        'The `status` field within the Geocoding response object contains the status of the request, and may contain debugging information to help you track down why geocoding is not working. The "status" field may contain the following values:\n\n- `OK` indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned.\n- `ZERO_RESULTS` indicates that the geocode was successful but returned no results. This may occur if the geocoder was passed a non-existent address or a `latlng` in a remote location.\n- `OVER_DAILY_LIMIT` indicates any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n- `OVER_QUERY_LIMIT` indicates that you are over your quota.\n- `REQUEST_DENIED` indicates that your request was denied.\n- `INVALID_REQUEST` generally indicates that the query (address, components, or latlng) is missing.\n- `UNKNOWN_ERROR` indicates that the request could not be processed due to a server error. The request may succeed if you try again.\n'
    );
