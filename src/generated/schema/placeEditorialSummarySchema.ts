import { z } from 'zod';

/**
 * @description Contains a summary of the place. A summary is comprised of a textual overview, and also includes the language code for these if applicable. Summary text must be presented as-is and can not be modified or altered.
 */
export const placeEditorialSummarySchema = z
    .object({
        overview: z.string().describe('A medium-length textual summary of the place.').optional(),
        language: z.string().describe('The language of the previous fields. May not always be present.').optional(),
    })
    .describe(
        'Contains a summary of the place. A summary is comprised of a textual overview, and also includes the language code for these if applicable. Summary text must be presented as-is and can not be modified or altered.'
    );
