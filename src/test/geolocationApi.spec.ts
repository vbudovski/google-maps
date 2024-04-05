import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { geolocate } from '..';
import { latLngLiteralSchema } from '../generated/schema/latLngLiteralSchema';
import { apiKey } from './consts';

describe('geolocate', () => {
    test('OK', async () => {
        const result = await geolocate(
            {
                key: apiKey,
            },
            {
                considerIp: 'false',
                wifiAccessPoints: [
                    {
                        macAddress: '3c:37:86:5d:75:d4',
                        signalStrength: -35,
                        signalToNoiseRatio: 0,
                    },
                    {
                        macAddress: '94:b4:0f:fd:c1:40',
                        signalStrength: -35,
                        signalToNoiseRatio: 0,
                    },
                ],
            }
        );

        const expected = z
            .object({
                location: latLngLiteralSchema.strict(),
                accuracy: z.number(),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
