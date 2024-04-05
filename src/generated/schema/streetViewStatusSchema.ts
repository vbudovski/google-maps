import { z } from 'zod';

export const streetViewStatusSchema = z
    .enum(['OK', 'INVALID_REQUEST', 'NOT_FOUND', 'ZERO_RESULTS', 'OVER_QUERY_LIMIT', 'REQUEST_DENIED', 'UNKNOWN_ERROR'])
    .describe(
        'The `status` field within the Streetview Metadata response object contains the status of the request. The `status` field may contain the following values:\n\n- `OK` indicates that no errors occurred; a panorama is found and metadata is returned.\n- `INVALID_REQUEST` indicates that the request was malformed.\n- `NOT_FOUND` indicates that the address string provided in the `location` parameter could not be found. This may occur if a non-existent address is given.\n- `ZERO_RESULTS` indicates that no panorama could be found near the provided location. This may occur if a non-existent or invalid `pano` id is given.\n- `OVER_QUERY_LIMIT` indicates the requestor has exceeded quota.\n- `REQUEST_DENIED` indicates that your request was denied. This may occur if you did not [authorize](https://developers.google.com/maps/documentation/streetview/get-api-key) your request, or if the Street View Static API is not activated in the Google Cloud Console project containing your API key.\n- `UNKNOWN_ERROR` indicates that the request could not be processed due to a server error. This is often a temporary status. The request may succeed if you try again\n'
    );
