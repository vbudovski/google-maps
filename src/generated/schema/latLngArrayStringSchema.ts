import { z } from 'zod';

export const latLngArrayStringSchema = z
    .array(z.string().min(2))
    .describe('An array of comma separated {latitude,longitude} strings.');
