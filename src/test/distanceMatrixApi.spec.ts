import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { distanceMatrix } from '..';
import { distanceMatrixRowSchema } from '../generated/schema/distanceMatrixRowSchema';
import { apiKey } from './consts';

describe('distanceMatrix', () => {
    test('OK', async () => {
        const result = await distanceMatrix({
            key: apiKey,
            origins: ['Yoyogi Park, 2-1 Yoyogikamizonochō, Shibuya City, Tokyo 151-0052, Japan'],
            destinations: ['LINE CUBE SHIBUYA, 1-1 Udagawacho, Shibuya City, Tokyo 150-0042, Japan'],
            units: 'metric',
            mode: 'walking',
        });

        const expected = z
            .object({
                status: z.literal('OK'),
                origin_addresses: z.array(z.string().includes('2-1 Yoyogikamizonochō, Shibuya City')).length(1),
                destination_addresses: z.array(z.string().includes('1-1 Udagawachō, Shibuya City')).length(1),
                rows: z.array(distanceMatrixRowSchema).length(1),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
