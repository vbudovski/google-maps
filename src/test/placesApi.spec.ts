import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import {
    autocomplete,
    findPlaceFromText,
    nearbySearch,
    placeDetails,
    placePhoto,
    queryAutocomplete,
    textSearch,
} from '..';
import { placeAutocompletePredictionSchema } from '../generated/schema/placeAutocompletePredictionSchema';
import { placePhotoSchema } from '../generated/schema/placePhotoSchema';
import { apiKey } from './consts';

describe('autocomplete', () => {
    test('OK', async () => {
        const result = await autocomplete({
            key: apiKey,
            input: 'guest house wagokoro',
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
        expect(result.predictions[0]?.place_id).toBe('ChIJlxPcJXmOGGARKgSIpbZII0g');
    });
});

describe('findPlaceFromText', () => {
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
});

describe('nearbySearch', () => {
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
});

describe('placeDetails', () => {
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
});

describe('placePhoto', () => {
    test('OK', async () => {
        const result = await placePhoto({
            key: apiKey,
            photo_reference:
                'ATplDJYIy26taB2ZfsZnbfcReQNZAuTJZxvK0llLTAmVY0jk26dhUfa6ZttSWJ2SP7ATeGuR2bTJvZQ5tzshcyJ1H5PcZL4RCNPV1kOz6dpNNg0uI-63vSgINt9uKf1-NAZpy2AvmKd-Bb5CVRHDNnDVTEXWIt1m4DTItI68d2qwB47g5tU',
            maxwidth: 25,
            maxheight: 25,
        });

        const expected = z.string();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});

describe('queryAutocomplete', () => {
    test('OK', async () => {
        const result = await queryAutocomplete({
            key: apiKey,
            input: 'guest house wagokoro',
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
        expect(result.predictions[0]?.place_id).toBe('ChIJlxPcJXmOGGARKgSIpbZII0g');
    });
});

describe('textSearch', () => {
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
});
