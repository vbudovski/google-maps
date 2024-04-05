import { z } from 'zod';

export const distanceMatrixElementStatusSchema = z
    .enum(['OK', 'NOT_FOUND', 'ZERO_RESULTS', 'MAX_ROUTE_LENGTH_EXCEEDED'])
    .describe(
        '- `OK` indicates the response contains a valid result.\n- `NOT_FOUND` indicates that the origin and/or destination of this pairing could not be geocoded.\n- `ZERO_RESULTS` indicates no route could be found between the origin and destination.\n- `MAX_ROUTE_LENGTH_EXCEEDED` indicates the requested route is too long and cannot be processed.\n'
    );
