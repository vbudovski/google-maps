import { z } from 'zod';

export const timeZoneStatusSchema = z
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
        'The `status` field within the Time Zone response object contains the status of the request. The `status` field may contain the following values:\n\n- `OK` indicates that the request was successful.\n- `INVALID_REQUEST` indicates that the request was malformed.\n- `OVER_DAILY_LIMIT` indicates any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n\n- `OVER_QUERY_LIMIT` indicates the requestor has exceeded quota.\n- `REQUEST_DENIED` indicates that the API did not complete the request. Confirm that the request was sent over HTTPS instead of HTTP.\n- `UNKNOWN_ERROR` indicates an unknown error.\n- `ZERO_RESULTS` indicates that no time zone data could be found for the specified position or time. Confirm that the request is for a location on land, and not over water.\n'
    );
