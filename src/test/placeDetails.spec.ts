import { expect, test } from 'vitest';
import { z } from 'zod';
import { placeDetails } from '..';
import { placePhotoSchema } from '../generated/schema/placePhotoSchema';
import { apiKey } from './api';

test('OK', async () => {
    const result = await placeDetails({
        key: apiKey,
        place_id: 'ChIJlxPcJXmOGGARKgSIpbZII0g',
        fields: ['name', 'vicinity', 'photos'],
    });

    const expected = z
        .object({
            status: z.literal('OK'),
            html_attributions: z.array(z.string()),
            result: z
                .object({
                    name: z.literal('WAGOKORO'),
                    photos: z.array(placePhotoSchema),
                    vicinity: z.literal('6-chōme-34-9 Higashinippori, Arakawa City'),
                })
                .strict(),
        })
        .strict();

    expect(() => {
        expected.parse(result);
    }).not.toThrow();
});
