import { z } from 'zod';

import { findPlaceFromText200Schema } from '../generated/schema/findPlaceFromTextSchema';
import { placeDetails200Schema } from '../generated/schema/placeDetailsSchema';
import { queryAutocomplete200Schema } from '../generated/schema/queryAutocompleteSchema';
import { Base } from './Base';

const BasicDataSearchFields = z.enum([
    'business_status',
    'formatted_address',
    'geometry',
    'icon',
    'icon_mask_base_uri',
    'icon_background_color',
    'name',
    'photos',
    'place_id',
    'plus_code',
    'type',
]);

const BasicDataFields = z.union([
    BasicDataSearchFields,
    z.enum(['address_components', 'adr_address', 'url', 'utc_offset', 'vicinity', 'wheelchair_accessible_entrance']),
]);

const ContactDataSearchFields = z.enum(['opening_hours']);

const ContactDataFields = z.union([
    ContactDataSearchFields,
    z.enum([
        'formatted_phone_number',
        'international_phone_number',
        'current_opening_hours',
        'secondary_opening_hours',
        'website',
    ]),
]);

const AtmosphereDataSearchFields = z.enum(['price_level', 'rating', 'user_ratings_total']);

const AtmosphereDataFields = z.union([
    AtmosphereDataSearchFields,
    z.enum([
        'curbside_pickup',
        'delivery',
        'dine_in',
        'editorial_summary',
        'reservable',
        'reviews',
        'serves_beer',
        'serves_breakfast',
        'serves_brunch',
        'serves_dinner',
        'serves_lunch',
        'serves_vegetarian_food',
        'serves_wine',
        'takeout',
    ]),
]);

const SearchFields = z.union([BasicDataSearchFields, ContactDataSearchFields, AtmosphereDataSearchFields]);

const Fields = z.union([BasicDataFields, ContactDataFields, AtmosphereDataFields]);

class Places extends Base {
    // biome-ignore lint/complexity/noUselessConstructor: false positive: https://github.com/biomejs/biome/issues/987.
    constructor(apiKey: string) {
        super(apiKey);
    }

    async findPlaceFromText(input: string, fields: z.infer<typeof SearchFields>[] = []) {
        const searchParams = new URLSearchParams();
        searchParams.set('inputtype', 'textquery');
        searchParams.set('input', input);
        searchParams.set('fields', fields.join(','));

        return await this.callJSONEndpoint(
            findPlaceFromText200Schema,
            'GET',
            'place/findplacefromtext/json',
            searchParams
        );
    }

    async details(placeId: string, fields: z.infer<typeof Fields>[] = []) {
        const searchParams = new URLSearchParams();
        searchParams.set('place_id', placeId);
        searchParams.set('fields', fields.join(','));

        return await this.callJSONEndpoint(placeDetails200Schema, 'GET', 'place/details/json', searchParams);
    }

    async photo(photoReference: string, maxWidth?: number, maxHeight?: number) {
        const searchParams = new URLSearchParams();
        searchParams.set('photo_reference', photoReference);
        if (maxWidth) {
            searchParams.set('maxwidth', String(maxWidth));
        }
        if (maxHeight) {
            searchParams.set('maxheight', String(maxHeight));
        }

        const response = await this.callEndpoint('GET', 'place/photo', searchParams);

        return response.blob();
    }

    async autocomplete(input: string, radius = 50000) {
        const searchParams = new URLSearchParams();
        searchParams.set('input', input);
        searchParams.set('radius', String(radius));

        return await this.callJSONEndpoint(queryAutocomplete200Schema, 'GET', 'place/autocomplete/json', searchParams);
    }
}

export { Places };
