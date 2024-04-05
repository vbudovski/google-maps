import { z } from 'zod';

export const directionsStatusSchema = z
    .enum([
        'OK',
        'NOT_FOUND',
        'ZERO_RESULTS',
        'MAX_WAYPOINTS_EXCEEDED',
        'MAX_ROUTE_LENGTH_EXCEEDED',
        'INVALID_REQUEST',
        'OVER_DAILY_LIMIT',
        'OVER_QUERY_LIMIT',
        'REQUEST_DENIED',
        'UNKNOWN_ERROR',
    ])
    .describe(
        "The status field within the Directions response object contains the status of the request, and may contain debugging information to help you track down why the Directions service failed. The status field may contain the following values:\n\n- `OK` indicates the response contains a valid result.\n- `NOT_FOUND` indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded.\n- `ZERO_RESULTS` indicates no route could be found between the origin and destination.\n- `MAX_WAYPOINTS_EXCEEDED` indicates that too many waypoints were provided in the request. For applications using the Directions API as a web service, or the directions service in the Maps JavaScript API, the maximum allowed number of waypoints is 25, plus the origin and destination.\n- `MAX_ROUTE_LENGTH_EXCEEDED` indicates the requested route is too long and cannot be processed. This error occurs when more complex directions are returned. Try reducing the number of waypoints, turns, or instructions.\n- `INVALID_REQUEST` indicates that the provided request was invalid. Common causes of this status include an invalid parameter or parameter value.\n- `OVER_DAILY_LIMIT` indicates any of the following:\n    - The API key is missing or invalid.\n    - Billing has not been enabled on your account.\n    - A self-imposed usage cap has been exceeded.\n    - The provided method of payment is no longer valid (for example, a credit card has expired).\n    See the [Maps FAQ](https://developers.google.com/maps/faq#over-limit-key-error) to learn how to fix this.\n- `OVER_QUERY_LIMIT` indicates the service has received too many requests from your application within the allowed time period.\n- `REQUEST_DENIED` indicates that the service denied use of the directions service by your application.\n- `UNKNOWN_ERROR` indicates a directions request could not be processed due to a server error. The request may succeed if you try again.\n"
    );
