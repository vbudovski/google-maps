import { z } from 'zod';
import { placeAutocompleteMatchedSubstringSchema } from './placeAutocompleteMatchedSubstringSchema';

export const placeAutocompleteStructuredFormatSchema = z.object({
    main_text: z.string().describe('Contains the main text of a prediction, usually the name of the place.'),
    main_text_matched_substrings: z
        .array(z.lazy(() => placeAutocompleteMatchedSubstringSchema))
        .describe(
            'Contains an array with `offset` value and `length`. These describe the location of the entered term in the prediction result text, so that the term can be highlighted if desired.'
        ),
    secondary_text: z
        .string()
        .describe('Contains the secondary text of a prediction, usually the location of the place.'),
    secondary_text_matched_substrings: z
        .array(z.lazy(() => placeAutocompleteMatchedSubstringSchema))
        .describe(
            'Contains an array with `offset` value and `length`. These describe the location of the entered term in the prediction result text, so that the term can be highlighted if desired.'
        )
        .optional(),
});
