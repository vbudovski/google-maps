import { z } from 'zod';

export const distanceMatrixStatusSchema = z
    .enum([
        'OK',
        'INVALID_REQUEST',
        'MAX_ELEMENTS_EXCEEDED',
        'MAX_DIMENSIONS_EXCEEDED',
        'OVER_DAILY_LIMIT',
        'OVER_QUERY_LIMIT',
        'REQUEST_DENIED',
        'UNKNOWN_ERROR',
    ])
    .describe(
        'Status codes returned by service.\n- `OK` indicates the response contains a valid result.\n- `INVALID_REQUEST` indicates that the provided request was invalid.\n- `MAX_ELEMENTS_EXCEEDED` indicates that the product of origins and destinations exceeds the per-query limit.\n- `MAX_DIMENSIONS_EXCEEDED` indicates that the number of origins or destinations exceeds the per-query limit.\n- `OVER_DAILY_LIMIT` indicates any of the following:\n  - The API key is missing or invalid.\n  - Billing has not been enabled on your account.\n  - A self-imposed usage cap has been exceeded.\n  - The provided method of payment is no longer valid (for example, a credit card has expired).\n- `OVER_QUERY_LIMIT` indicates the service has received too many requests from your application within the allowed time period.\n- `REQUEST_DENIED` indicates that the service denied use of the Distance Matrix service by your application.\n- `UNKNOWN_ERROR` indicates a Distance Matrix request could not be processed due to a server error. The request may succeed if you try again.\n'
    );
