import { z } from 'zod';

const PlaceEditorialSummary = z.object({
    language: z.string().optional(),
    overview: z.string().optional(),
});

export { PlaceEditorialSummary };
