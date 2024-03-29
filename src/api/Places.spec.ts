import { Places } from './Places';

const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

test('findPlaceFromText', async () => {
    const api = new Places(apiKey);
    const result = await api.findPlaceFromText('guest house wagokoro', ['name', 'formatted_address', 'place_id']);
    expect(result.status).toBe('OK');
    expect(result.candidates[0]?.place_id).toBe('ChIJlxPcJXmOGGARKgSIpbZII0g');
});

test('placeDetails', async () => {
    const api = new Places(apiKey);
    const result = await api.details('ChIJlxPcJXmOGGARKgSIpbZII0g', ['name', 'vicinity', 'photos']);
    expect(result.status).toBe('OK');
    expect(result.result?.vicinity).toBe('6-chōme-34-9 Higashinippori, Arakawa City');
});

test.skip('photo', async () => {
    const api = new Places(apiKey);
    const result = await api.photo(
        'ATplDJYIy26taB2ZfsZnbfcReQNZAuTJZxvK0llLTAmVY0jk26dhUfa6ZttSWJ2SP7ATeGuR2bTJvZQ5tzshcyJ1H5PcZL4RCNPV1kOz6dpNNg0uI-63vSgINt9uKf1-NAZpy2AvmKd-Bb5CVRHDNnDVTEXWIt1m4DTItI68d2qwB47g5tU',
        25,
        25
    );
    expect(result.type).toBe('image/jpeg');
});

test('autocomplete', async () => {
    const api = new Places(apiKey);
    const result = await api.autocomplete('Paris');
    expect(result.status).toBe('OK');
    expect(result.predictions[0]?.place_id).toBe('ChIJD7fiBh9u5kcRYJSMaMOCCwQ');
});
