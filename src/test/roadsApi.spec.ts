import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { nearestRoads } from '..';
import { snappedPointSchema } from '../generated/schema/snappedPointSchema';
import { apiKey } from './consts';

describe('nearestRoads', () => {
    test('OK', async () => {
        const result = await nearestRoads({
            key: apiKey,
            points: ['60.170880,24.942795', '60.170879,24.942796', '60.170877,24.942796'],
        });

        const expected = z
            .object({
                snappedPoints: z.array(snappedPointSchema),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
