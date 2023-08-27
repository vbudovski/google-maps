import { z } from 'zod';

import { Place } from '../schemas/Place';
import { PlaceAutocompletePrediction } from '../schemas/PlaceAutocompletePrediction';
import { Base } from './Base';

const PlacesSearchStatus = z.enum([
    'OK',
    'ZERO_RESULTS',
    'INVALID_REQUEST',
    'OVER_QUERY_LIMIT',
    'REQUEST_DENIED',
    'UNKNOWN_ERROR',
]);

const FindPlaceResponse = z.object({
    candidates: Place.array(),
    status: PlacesSearchStatus,
    error_message: z.string().optional(),
    info_messages: z.string().array().optional(),
});

const PlacesDetailsStatus = z.enum([
    'OK',
    'ZERO_RESULTS',
    'NOT_FOUND',
    'INVALID_REQUEST',
    'OVER_QUERY_LIMIT',
    'REQUEST_DENIED',
    'UNKNOWN_ERROR',
]);

const PlaceDetailsResponse = z.object({
    html_attributions: z.string().array(),
    result: Place.optional(),
    status: PlacesDetailsStatus,
    info_messages: z.string().array().optional(),
});

const PlacesAutocompleteStatus = z.enum([
    'OK',
    'ZERO_RESULTS',
    'INVALID_REQUEST',
    'OVER_QUERY_LIMIT',
    'REQUEST_DENIED',
    'UNKNOWN_ERROR',
]);

const PlacesAutocompleteResponse = z.object({
    predictions: PlaceAutocompletePrediction.array(),
    status: PlacesAutocompleteStatus,
    error_message: z.string().optional(),
    info_messages: z.string().array().optional(),
});

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
    z.enum([
        'address_components',
        'adr_address',
        'url',
        'utc_offset',
        'vicinity',
        'wheelchair_accessible_entrance',
    ]),
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

const SearchFields = z.union([
    BasicDataSearchFields,
    ContactDataSearchFields,
    AtmosphereDataSearchFields,
]);

const Fields = z.union([BasicDataFields, ContactDataFields, AtmosphereDataFields]);

class Places extends Base {
    constructor(apiKey: string) {
        super(apiKey);
    }

    async findPlaceFromText(
        input: string,
        fields: z.infer<typeof SearchFields>[] = []
    ): Promise<z.infer<typeof FindPlaceResponse>> {
        const searchParams = new URLSearchParams();
        searchParams.set('inputtype', 'textquery');
        searchParams.set('input', input);
        searchParams.set('fields', fields.join(','));

        const response = await this.callEndpoint(
            'GET',
            'place/findplacefromtext/json',
            searchParams
        );
        const data = await response.json();

        return FindPlaceResponse.parse(data);
    }

    async details(
        placeId: string,
        fields: z.infer<typeof Fields>[] = []
    ): Promise<z.infer<typeof PlaceDetailsResponse>> {
        const searchParams = new URLSearchParams();
        searchParams.set('place_id', placeId);
        searchParams.set('fields', fields.join(','));

        const response = await this.callEndpoint('GET', 'place/details/json', searchParams);
        const data = await response.json();

        return PlaceDetailsResponse.parse(data);
    }

    async photo(photoReference: string, maxWidth?: number, maxHeight?: number): Promise<Blob> {
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

    async autocomplete(
        input: string,
        radius: number = 50000
    ): Promise<z.infer<typeof PlacesAutocompleteResponse>> {
        const searchParams = new URLSearchParams();
        searchParams.set('input', input);
        searchParams.set('radius', String(radius));

        const response = await this.callEndpoint('GET', 'place/autocomplete/json', searchParams);
        const data = await response.json();

        return PlacesAutocompleteResponse.parse(data);
    }
}

export { Places };
