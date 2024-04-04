import { expect, test } from 'vitest';
import { z } from 'zod';
import { findPlaceFromText } from '..';
import { apiKey } from './api';

test('OK', async () => {
    const result = await findPlaceFromText({
        key: apiKey,
        inputtype: 'textquery',
        input: 'guest house wagokoro',
        fields: ['name', 'formatted_address', 'place_id'],
    });

    const expected = z
        .object({
            status: z.literal('OK'),
            candidates: z
                .array(
                    z
                        .object({
                            name: z.literal('WAGOKORO'),
                            formatted_address: z.literal(
                                '6 Chome-34-9 Higashinippori, Arakawa City, Tokyo 116-0014, Japan'
                            ),
                            place_id: z.literal('ChIJlxPcJXmOGGARKgSIpbZII0g'),
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
