import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { streetView, streetViewMetadata } from '..';
import { latLngLiteralSchema } from '../generated/schema/latLngLiteralSchema';
import { apiKey } from './consts';

describe('streetView', () => {
    test('OK', async () => {
        const result = await streetView({
            key: apiKey,
            location: '35.70434411172008,139.8114161291331',
            heading: 0,
            pitch: 20,
            size: '600x400',
        });

        const expected = z.string();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});

describe('streetViewMetadata', () => {
    test('OK', async () => {
        const result = await streetViewMetadata({
            key: apiKey,
            location: '35.70434411172008,139.8114161291331',
            heading: 0,
            pitch: 20,
            size: '600x400',
        });

        const expected = z
            .object({
                copyright: z.string(),
                date: z.string(),
                location: latLngLiteralSchema.strict(),
                pano_id: z.string(),
                status: z.literal('OK'),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
