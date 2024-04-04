import { expect, test } from 'vitest';
import { z } from 'zod';
import { nearbySearch } from '..';
import { placePhotoSchema } from '../generated/schema/placePhotoSchema';
import { apiKey } from './api';

test('OK', async () => {
    const result = await nearbySearch({
        key: apiKey,
        keyword: 'guest house wagokoro',
        type: 'lodging',
        location: '35.73178053464217,139.77567540368557',
        radius: 1,
    });

    const expected = z
        .object({
            status: z.literal('OK'),
            html_attributions: z.array(z.string()),
            results: z
                .array(
                    z
                        .object({
                            business_status: z.string(),
                            geometry: z.object({}),
                            icon: z.string(),
                            icon_background_color: z.string(),
                            icon_mask_base_uri: z.string(),
                            name: z.literal('WAGOKORO'),
                            opening_hours: z.object({}),
                            photos: z.array(placePhotoSchema),
                            place_id: z.literal('ChIJlxPcJXmOGGARKgSIpbZII0g'),
                            plus_code: z.object({}),
                            rating: z.number(),
                            reference: z.string(),
                            scope: z.string(),
                            types: z.array(z.string()),
                            user_ratings_total: z.number(),
                            vicinity: z.literal('6 Chome-34-9 Higashinippori, Arakawa City'),
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
