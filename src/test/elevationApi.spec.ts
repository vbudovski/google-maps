import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { elevation } from '..';
import { latLngLiteralSchema } from '../generated/schema/latLngLiteralSchema';
import { apiKey } from './consts';

describe('elevation', () => {
    test('OK', async () => {
        const result = await elevation({
            key: apiKey,
            locations: ['35.3613599665286,138.72753506137718'],
        });

        const expected = z
            .object({
                status: z.literal('OK'),
                results: z
                    .array(
                        z
                            .object({
                                elevation: z.number().min(3700).max(3800),
                                resolution: z.number(),
                                location: latLngLiteralSchema.strict(),
                            })
                            .strict()
                    )
                    .length(1),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
