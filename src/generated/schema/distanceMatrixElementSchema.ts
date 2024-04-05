import { z } from 'zod';
import { distanceMatrixElementStatusSchema } from './distanceMatrixElementStatusSchema';
import { fareSchema } from './fareSchema';
import { textValueObjectSchema } from './textValueObjectSchema';

export const distanceMatrixElementSchema = z.object({
    fare: z
        .lazy(() => fareSchema)
        .describe(
            'If present, contains the total fare (that is, the total ticket costs) on this route. This property is only returned for transit requests and only for transit providers where fare information is available.'
        )
        .optional(),
    distance: z
        .lazy(() => textValueObjectSchema)
        .describe(
            "The total distance of this route, expressed in meters (value) and as text. The textual value uses the unit system specified with the unit parameter of the original request, or the origin's region."
        )
        .optional(),
    duration_in_traffic: z
        .lazy(() => textValueObjectSchema)
        .describe(
            "The length of time it takes to travel this route, based on current and historical traffic conditions. See the `traffic_model` request parameter for the options you can use to request that the returned value is optimistic, pessimistic, or a best-guess estimate. The duration is expressed in seconds (the value field) and as text. The textual representation is localized according to the query's language parameter. The duration in traffic is returned only if all of the following are true:\n\n* The request includes a `departure_time` parameter.\n* Traffic conditions are available for the requested route.\n* The mode parameter is set to driving.\n"
        )
        .optional(),
    duration: z
        .lazy(() => textValueObjectSchema)
        .describe(
            "The length of time it takes to travel this route, expressed in seconds (the value field) and as text. The textual representation is localized according to the query's language parameter."
        )
        .optional(),
    status: z.lazy(() => distanceMatrixElementStatusSchema).describe('A status for the element.'),
});
