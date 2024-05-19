import { z } from 'zod';
import { distanceMatrixElementStatusSchema } from './distanceMatrixElementStatusSchema';
import { fareSchema } from './fareSchema';
import { textValueObjectSchema } from './textValueObjectSchema';

export const distanceMatrixElementSchema = z.object({
    fare: z.lazy(() => fareSchema).optional(),
    distance: z.lazy(() => textValueObjectSchema).optional(),
    duration_in_traffic: z.lazy(() => textValueObjectSchema).optional(),
    duration: z.lazy(() => textValueObjectSchema).optional(),
    status: z.lazy(() => distanceMatrixElementStatusSchema),
});
