import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { geocode } from '..';
import { geocodingResultSchema } from '../generated/schema/geocodingResultSchema';
import { plusCodeSchema } from '../generated/schema/plusCodeSchema';
import { apiKey } from './consts';

describe('geocode', () => {
    test('OK', async () => {
        const result = await geocode({
            key: apiKey,
            latlng: '35.731841205227546, 139.77569287860982',
        });

        const expected = z
            .object({
                status: z.literal('OK'),
                plus_code: plusCodeSchema,
                results: z.array(geocodingResultSchema),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
