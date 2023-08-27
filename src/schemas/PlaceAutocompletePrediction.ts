import { z } from 'zod';

import { Table1, Table2 } from './PlaceType';

const PlaceAutocompleteMatchedSubstring = z.object({
    length: z.number(),
    offset: z.number(),
});

const PlaceAutocompleteStructuredFormat = z.object({
    main_text: z.string(),
    main_text_matched_substrings: PlaceAutocompleteMatchedSubstring.array(),
    secondary_text: z.string().optional(),
    secondary_text_matched_substrings: PlaceAutocompleteMatchedSubstring.array().optional(),
});

const PlaceAutocompleteTerm = z.object({
    offset: z.number(),
    value: z.string(),
});

const PlaceAutocompletePrediction = z.object({
    description: z.string(),
    matched_substrings: PlaceAutocompleteMatchedSubstring.array(),
    structured_formatting: PlaceAutocompleteStructuredFormat,
    terms: PlaceAutocompleteTerm.array(),
    distance_meters: z.number().optional(),
    place_id: z.string().optional(),
    // Deprecated.
    reference: z.string().optional(),
    types: z.union([Table1, Table2]).array().optional(),
});

export { PlaceAutocompletePrediction };
