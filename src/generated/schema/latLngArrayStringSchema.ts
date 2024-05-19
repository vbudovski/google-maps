import { z } from 'zod';

/**
 * @description An array of comma separated {latitude,longitude} strings.
 */
export const latLngArrayStringSchema = z
    .array(z.string().min(2))
    .describe('An array of comma separated {latitude,longitude} strings.');
