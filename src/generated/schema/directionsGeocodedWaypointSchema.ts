import { z } from 'zod';

export const directionsGeocodedWaypointSchema = z.object({
    geocoder_status: z
        .enum(['OK', 'ZERO_RESULTS'])
        .describe(
            'Indicates the status code resulting from the geocoding operation. This field may contain the following values.'
        )
        .optional(),
    partial_match: z.unknown().optional(),
    place_id: z
        .string()
        .describe(
            'A unique identifier that can be used with other Google APIs. See the [Place ID overview](https://developers.google.com/maps/documentation/places/web-service/place-id).'
        )
        .optional(),
    types: z
        .array(
            z.enum([
                'administrative_area_level_1',
                'administrative_area_level_2',
                'administrative_area_level_3',
                'administrative_area_level_4',
                'administrative_area_level_5',
                'amusement_park',
                'airport',
                'colloquial_area',
                'country',
                'establishment',
                'intersection',
                'locality',
                'natural_feature',
                'neighborhood',
                'park',
                'plus_code',
                'point_of_interest',
                'political',
                'postal_code',
                'premise',
                'route',
                'street_address',
                'sublocality',
                'sublocality_level_1',
                'subpremise',
                'tourist_attraction',
                'train_station',
                'transit_station',
            ])
        )
        .describe(
            'Indicates the address type of the geocoding result used for calculating directions.\n\n* `administrative_area_level_1` indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states. Not all nations exhibit these administrative levels. In most cases, administrative_area_level_1 short names will closely match ISO 3166-2 subdivisions and other widely circulated lists; however this is not guaranteed as our geocoding results are based on a variety of signals and location data.\n* `administrative_area_level_2` indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties. Not all nations exhibit these administrative levels.\n* `administrative_area_level_3` indicates a third-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.\n* `administrative_area_level_4` indicates a fourth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.\n* `administrative_area_level_5` indicates a fifth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.\n* `airport` indicates an airport.\n* `colloquial_area` indicates a commonly-used alternative name for the entity.\n* `country` indicates the national political entity, and is typically the highest order type returned by the Geocoder.\n* `intersection` indicates a major intersection, usually of two major roads.\n* `locality` indicates an incorporated city or town political entity.\n* `natural_feature` indicates a prominent natural feature.\n* `neighborhood` indicates a named neighborhood\n* `park` indicates a named park.\n* `plus_code` indicates an encoded location reference, derived from latitude and longitude. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named). See [https://plus.codes](https://plus.codes/) for details.\n* `point_of_interest` indicates a named point of interest. Typically, these "POI"s are prominent local entities that don\'t easily fit in another category, such as "Empire State Building" or "Eiffel Tower".\n* `political` indicates a political entity. Usually, this type indicates a polygon of some civil administration.\n* `postal_code` indicates a postal code as used to address postal mail within the country.\n* `premise` indicates a named location, usually a building or collection of buildings with a common name\n* `route` indicates a named route (such as "US 101").\n* `street_address` indicates a precise street address.\n* `sublocality` indicates a first-order civil entity below a locality. For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.\n* `subpremise` indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a common name\n* `tourist_attraction` indicates a tourist attraction.\n* `train_station` indicates a train station.\n* `transit_station` indicates a transit station.\n\nAn empty list of types indicates there are no known types for the particular address component, for example, Lieu-dit in France.\n'
        )
        .optional(),
});
