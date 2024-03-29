import { z } from 'zod';
import { boundsSchema } from './boundsSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';

export const geometrySchema = z
    .object({ location: z.lazy(() => latLngLiteralSchema), viewport: z.lazy(() => boundsSchema) })
    .describe('An object describing the location.');
