import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { timezone } from '..';
import { apiKey } from './consts';

describe('timezone', () => {
    test('OK', async () => {
        const result = await timezone({
            key: apiKey,
            location: '-27.467980910222206, 153.0239316938035',
            timestamp: 1704067200,
        });

        const expected = z
            .object({
                status: z.literal('OK'),
                dstOffset: z.literal(0),
                rawOffset: z.literal(36000),
                timeZoneId: z.literal('Australia/Brisbane'),
                timeZoneName: z.literal('Australian Eastern Standard Time'),
            })
            .strict();

        expect(() => {
            expected.parse(result);
        }).not.toThrow();
    });
});
