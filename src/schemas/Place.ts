import { z } from 'zod';

import { AddressComponent } from './AddressComponent';
import { Geometry } from './Geometry';
import { PlaceEditorialSummary } from './PlaceEditorialSummary';
import { PlaceOpeningHours } from './PlaceOpeningHours';
import { PlacePhoto } from './PlacePhoto';
import { PlaceReview } from './PlaceReview';
import { Table1, Table2 } from './PlaceType';
import { PlusCode } from './PlusCode';

const Place = z.object({
    address_components: AddressComponent.array().optional(),
    adr_address: z.string().optional(),
    business_status: z.enum(['OPERATIONAL', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY']).optional(),
    curbside_pickup: z.boolean().optional(),
    current_opening_hours: PlaceOpeningHours.optional(),
    delivery: z.boolean().optional(),
    dine_in: z.boolean().optional(),
    editorial_summary: PlaceEditorialSummary.optional(),
    formatted_address: z.string().optional(),
    formatted_phone_number: z.string().optional(),
    geometry: Geometry.optional(),
    icon: z.string().optional(),
    icon_background_color: z.string().optional(),
    icon_mask_base_uri: z.string().optional(),
    international_phone_number: z.string().optional(),
    name: z.string().optional(),
    opening_hours: PlaceOpeningHours.optional(),
    // Deprecated.
    permanently_closed: z.boolean().optional(),
    photos: PlacePhoto.array().optional(),
    place_id: z.string().optional(),
    plus_code: PlusCode.optional(),
    price_level: z.number().min(0).max(4).int().optional(),
    rating: z.number().min(1).max(5).optional(),
    // Deprecated.
    reference: z.string().optional(),
    reservable: z.boolean().optional(),
    reviews: PlaceReview.array().max(5).optional(),
    secondary_opening_hours: PlaceOpeningHours.optional(),
    serves_beer: z.boolean().optional(),
    serves_breakfast: z.boolean().optional(),
    serves_brunch: z.boolean().optional(),
    serves_dinner: z.boolean().optional(),
    serves_lunch: z.boolean().optional(),
    serves_vegetarian_food: z.boolean().optional(),
    serves_wine: z.boolean().optional(),
    takeout: z.boolean().optional(),
    types: z.union([Table1, Table2]).array().optional(),
    url: z.string().url().optional(),
    user_ratings_total: z.number().min(0).optional(),
    utc_offset: z.number().optional(),
    vicinity: z.string().optional(),
    website: z.string().url().optional(),
    wheelchair_accessible_entrance: z.boolean().optional(),
});

export { Place };
