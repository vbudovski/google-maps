import { expect, test } from 'vitest';
import { z } from 'zod';
import { queryAutocomplete } from '..';
import { placeAutocompletePredictionSchema } from '../generated/schema/placeAutocompletePredictionSchema';
import { apiKey } from './api';

test('OK', async () => {
    const result = await queryAutocomplete({
        key: apiKey,
        input: 'Paris',
        radius: 1,
    });

    const expected = z
        .object({
            status: z.literal('OK'),
            predictions: z.array(placeAutocompletePredictionSchema),
        })
        .strict();

    expect(() => {
        expected.parse(result);
    }).not.toThrow();
    expect(result.predictions[0]?.place_id).toBe('ChIJD7fiBh9u5kcRYJSMaMOCCwQ');
});
