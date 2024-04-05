import { z } from 'zod';
import { distanceMatrixElementSchema } from './distanceMatrixElementSchema';

export const distanceMatrixRowSchema = z.object({
    elements: z
        .array(z.lazy(() => distanceMatrixElementSchema))
        .describe(
            "When the Distance Matrix API returns results, it places them within a JSON rows array. Even if no results are returned (such as when the origins and/or destinations don't exist), it still returns an empty array. \n\nRows are ordered according to the values in the origin parameter of the request. Each row corresponds to an origin, and each element within that row corresponds to a pairing of the origin with a destination value.\n\nEach row array contains one or more element entries, which in turn contain the information about a single origin-destination pairing.\n"
        ),
});
