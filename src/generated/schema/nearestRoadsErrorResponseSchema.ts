import { z } from 'zod';
import { nearestRoadsErrorSchema } from './nearestRoadsErrorSchema';

export const nearestRoadsErrorResponseSchema = z.object({ error: z.lazy(() => nearestRoadsErrorSchema).optional() });
