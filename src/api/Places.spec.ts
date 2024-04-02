import { findPlaceFromText, placeDetails, placePhoto, queryAutocomplete } from '../generated';

const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

test('findPlaceFromText', async () => {
    const result = await findPlaceFromText({
        key: apiKey,
        inputtype: 'textquery',
        input: 'guest house wagokoro',
        fields: ['name', 'formatted_address', 'place_id'],
    });

    expect(result.status).toBe('OK');
    expect(result.candidates[0]?.place_id).toBe('ChIJlxPcJXmOGGARKgSIpbZII0g');
});

test('placeDetails', async () => {
    const result = await placeDetails({
        key: apiKey,
        place_id: 'ChIJlxPcJXmOGGARKgSIpbZII0g',
        fields: ['name', 'vicinity', 'photos'],
    });

    expect(result.status).toBe('OK');
    expect(result.result?.vicinity).toBe('6-chōme-34-9 Higashinippori, Arakawa City');
});

test.skip('photo', async () => {
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

test('autocomplete', async () => {
    const result = await queryAutocomplete({
        key: apiKey,
        input: 'Paris',
        radius: 1,
    });
    expect(result.status).toBe('OK');
    expect(result.predictions[0]?.place_id).toBe('ChIJD7fiBh9u5kcRYJSMaMOCCwQ');
});
