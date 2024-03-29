import { z } from 'zod';

export const placeAutocompleteMatchedSubstringSchema = z.object({
    length: z.number().describe('Length of the matched substring in the prediction result text.'),
    offset: z.number().describe('Start location of the matched substring in the prediction result text.'),
});
