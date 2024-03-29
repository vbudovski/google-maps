import { z } from 'zod';

export const placeAutocompleteTermSchema = z.object({
    value: z.string().describe('The text of the term.'),
    offset: z
        .number()
        .describe('Defines the start position of this term in the description, measured in Unicode characters'),
});
