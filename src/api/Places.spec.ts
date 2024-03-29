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
        'AUacShizLPy6DqOH1WKjPBR0iTZTrJS1kvLJylidffzI4UX0LPlK63nU7c8L6D8NwW6zH8IPUkpz3uzLsIVDU73S4kQfFx01zMaNIO7Snf-HhvWld4Xty8BY7toufN-NilInhZN4krH-rcAsDaOFl1JZFZabb5GzmTow-rUMnfzyl0b4IiQ',
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
