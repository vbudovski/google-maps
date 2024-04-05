import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { directions } from '..';
import { directionsGeocodedWaypointSchema } from '../generated/schema/directionsGeocodedWaypointSchema';
import { directionsRouteSchema } from '../generated/schema/directionsRouteSchema';
import { apiKey } from './consts';

describe('directions', () => {
    test('OK', async () => {
        const result = await directions({
            key: apiKey,
            origin: 'Yoyogi Park, 2-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-0052, Japan',
            destination: 'LINE CUBE SHIBUYA, 1-1 Udagawacho, Shibuya City, Tokyo 150-0042, Japan',
        });

        const expected = z
            .object({
                status: z.literal('OK'),
                geocoded_waypoints: z.array(directionsGeocodedWaypointSchema).length(2),
                routes: z.array(directionsRouteSchema).length(1),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
