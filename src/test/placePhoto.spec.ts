import { expect, test } from 'vitest';
import { placePhoto } from '..';
import { apiKey } from './api';

test.skip('OK', async () => {
    const result = await placePhoto({
        key: apiKey,
        photo_reference:
            'ATplDJYIy26taB2ZfsZnbfcReQNZAuTJZxvK0llLTAmVY0jk26dhUfa6ZttSWJ2SP7ATeGuR2bTJvZQ5tzshcyJ1H5PcZL4RCNPV1kOz6dpNNg0uI-63vSgINt9uKf1-NAZpy2AvmKd-Bb5CVRHDNnDVTEXWIt1m4DTItI68d2qwB47g5tU',
        maxwidth: 25,
        maxheight: 25,
    });

    // FIXME: Handle non-JSON results.
    expect(result).toBeFalsy();
});
