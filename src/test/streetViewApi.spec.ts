import { describe, expect, test } from 'vitest';
import { streetView } from '..';
import { apiKey } from './consts';

describe('streetView', () => {
    test.skip('OK', async () => {
        const result = await streetView({
            key: apiKey,
            location: '35.70434411172008,139.8114161291331',
            heading: 0,
            pitch: 20,
            size: '600x400',
        });

        // FIXME: Handle non-JSON results.
        expect(result).toBeFalsy();
    });
});
