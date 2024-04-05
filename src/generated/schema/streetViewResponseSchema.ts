import { z } from 'zod';
import { latLngLiteralSchema } from './latLngLiteralSchema';
import { streetViewStatusSchema } from './streetViewStatusSchema';

export const streetViewResponseSchema = z.object({
    copyright: z.string().describe('An array of snapped points.').optional(),
    date: z.string().describe('A string indicating year and month that the panorama was captured.').optional(),
    location: z
        .lazy(() => latLngLiteralSchema)
        .describe('The location of the panorama.')
        .optional(),
    pano_id: z
        .string()
        .describe(
            'A specific panorama ID. These are generally stable, though panoramas may change ID over time as imagery is refreshed.'
        )
        .optional(),
    status: z.lazy(() => streetViewStatusSchema).describe('The status of the request.'),
});
