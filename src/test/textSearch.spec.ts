import { expect, test } from 'vitest';
import { z } from 'zod';
import { textSearch } from '..';
import { placePhotoSchema } from '../generated/schema/placePhotoSchema';
import { apiKey } from './api';

test('OK', async () => {
    const result = await textSearch({
        key: apiKey,
        query: 'guest house wagokoro',
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
                            formatted_address: z.literal(
                                '6 Chome-34-9 Higashinippori, Arakawa City, Tokyo 116-0014, Japan'
                            ),
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
                            types: z.array(z.string()),
                            user_ratings_total: z.number(),
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
