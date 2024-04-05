import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { nearestRoads, snapToRoads } from '..';
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

describe('snapToRoads', () => {
    test('OK', async () => {
        const result = await snapToRoads({
            key: apiKey,
            path: [
                '-35.27801,149.12958',
                '-35.28032,149.12907',
                '-35.28099,149.12929',
                '-35.28144,149.12984',
                '-35.28194,149.13003',
                '-35.28282,149.12956',
                '-35.28302,149.12881',
                '-35.28473,149.12836',
            ],
            interpolate: true,
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
