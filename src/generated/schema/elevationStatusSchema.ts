import { z } from 'zod';

/**
 * @description Status codes returned by service.\n- `OK` indicating the API request was successful.\n- `DATA_NOT_AVAILABLE` indicating that there\'s no available data for the input locations. \n- `INVALID_REQUEST` indicating the API request was malformed.\n- `OVER_DAILY_LIMIT` indicating any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n- `OVER_QUERY_LIMIT` indicating the requestor has exceeded quota.\n- `REQUEST_DENIED` indicating the API did not complete the request.\n- `UNKNOWN_ERROR` indicating an unknown error.\n
 */
export const elevationStatusSchema = z
    .enum([
        'OK',
        'DATA_NOT_AVAILABLE',
        'INVALID_REQUEST',
        'OVER_DAILY_LIMIT',
        'OVER_QUERY_LIMIT',
        'REQUEST_DENIED',
        'UNKNOWN_ERROR',
    ])
    .describe(
        "Status codes returned by service.\n- `OK` indicating the API request was successful.\n- `DATA_NOT_AVAILABLE` indicating that there's no available data for the input locations. \n- `INVALID_REQUEST` indicating the API request was malformed.\n- `OVER_DAILY_LIMIT` indicating any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n- `OVER_QUERY_LIMIT` indicating the requestor has exceeded quota.\n- `REQUEST_DENIED` indicating the API did not complete the request.\n- `UNKNOWN_ERROR` indicating an unknown error.\n"
    );
