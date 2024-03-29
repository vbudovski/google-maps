import { z } from 'zod';

export const directionsTransitAgencySchema = z.object({
    name: z.string().describe('The name of this transit agency.').optional(),
    phone: z.string().describe("The transit agency's phone number.").optional(),
    url: z.string().describe("The transit agency's URL.").optional(),
});
