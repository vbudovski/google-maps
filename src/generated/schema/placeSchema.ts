import { z } from 'zod';
import { addressComponentSchema } from './addressComponentSchema';
import { geometrySchema } from './geometrySchema';
import { placeEditorialSummarySchema } from './placeEditorialSummarySchema';
import { placeOpeningHoursSchema } from './placeOpeningHoursSchema';
import { placePhotoSchema } from './placePhotoSchema';
import { placeReviewSchema } from './placeReviewSchema';
import { plusCodeSchema } from './plusCodeSchema';

export const placeSchema = z
    .object({
        address_components: z
            .array(z.lazy(() => addressComponentSchema))
            .describe('An array containing the separate components applicable to this address.')
            .optional(),
        adr_address: z
            .string()
            .describe(
                "A representation of the place's address in the [adr microformat](http://microformats.org/wiki/adr)."
            )
            .optional(),
        business_status: z
            .enum(['OPERATIONAL', 'CLOSED_TEMPORARILY', 'CLOSED_PERMANENTLY'])
            .describe(
                'Indicates the operational status of the place, if it is a business. If no data exists, `business_status` is not returned.\n'
            )
            .optional(),
        curbside_pickup: z.boolean().describe('Specifies if the business supports curbside pickup.').optional(),
        current_opening_hours: z
            .lazy(() => placeOpeningHoursSchema)
            .describe(
                'Contains the hours of operation for the next seven days (including today). The time period starts at midnight on the date of the request and ends at 11:59 pm six days later. This field includes the `special_days` subfield of all hours, set for dates that have exceptional hours.'
            )
            .optional(),
        delivery: z.boolean().describe('Specifies if the business supports delivery.').optional(),
        dine_in: z
            .boolean()
            .describe('Specifies if the business supports indoor or outdoor seating options.')
            .optional(),
        editorial_summary: z
            .lazy(() => placeEditorialSummarySchema)
            .describe(
                'Contains a summary of the place. A summary is comprised of a textual overview, and also includes the language code for these if applicable. Summary text must be presented as-is and can not be modified or altered.'
            )
            .optional(),
        formatted_address: z
            .string()
            .describe(
                'A string containing the human-readable address of this place.\n\nOften this address is equivalent to the postal address. Note that some countries, such as the United Kingdom, do not allow distribution of true postal addresses due to licensing restrictions.\n\nThe formatted address is logically composed of one or more address components. For example, the address "111 8th Avenue, New York, NY" consists of the following components: "111" (the street number), "8th Avenue" (the route), "New York" (the city) and "NY" (the US state).\n\nDo not parse the formatted address programmatically. Instead you should use the individual address components, which the API response includes in addition to the formatted address field.\n'
            )
            .optional(),
        formatted_phone_number: z
            .string()
            .describe(
                "Contains the place's phone number in its [local format](http://en.wikipedia.org/wiki/Local_conventions_for_writing_telephone_numbers)."
            )
            .optional(),
        geometry: z
            .lazy(() => geometrySchema)
            .describe('Contains the location and viewport for the location.')
            .optional(),
        icon: z
            .string()
            .describe(
                'Contains the URL of a suggested icon which may be displayed to the user when indicating this result on a map.'
            )
            .optional(),
        icon_background_color: z
            .string()
            .describe("Contains the default HEX color code for the place's category.")
            .optional(),
        icon_mask_base_uri: z
            .string()
            .describe('Contains the URL of a recommended icon, minus the `.svg` or `.png` file type extension.')
            .optional(),
        international_phone_number: z
            .string()
            .describe(
                "Contains the place's phone number in international format. International format includes the country code, and is prefixed with the plus, +, sign. For example, the international_phone_number for Google's Sydney, Australia office is `+61 2 9374 4000`."
            )
            .optional(),
        name: z
            .string()
            .describe(
                'Contains the human-readable name for the returned result. For `establishment` results, this is usually the canonicalized business name.'
            )
            .optional(),
        opening_hours: z
            .lazy(() => placeOpeningHoursSchema)
            .describe('Contains the regular hours of operation.')
            .optional(),
        permanently_closed: z
            .boolean()
            .describe('Use `business_status` to get the operational status of businesses.')
            .optional(),
        photos: z
            .array(z.lazy(() => placePhotoSchema))
            .describe(
                'An array of photo objects, each containing a reference to an image. A request may return up to ten photos. More information about place photos and how you can use the images in your application can be found in the [Place Photos](https://developers.google.com/maps/documentation/places/web-service/photos) documentation.'
            )
            .optional(),
        place_id: z
            .string()
            .describe(
                'A textual identifier that uniquely identifies a place. To retrieve information about the place, pass this identifier in the `place_id` field of a Places API request. For more information about place IDs, see the [place ID overview](https://developers.google.com/maps/documentation/places/web-service/place-id).'
            )
            .optional(),
        plus_code: z
            .lazy(() => plusCodeSchema)
            .describe(
                'An encoded location reference, derived from latitude and longitude coordinates, that represents an area: 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named). See [Open Location Code](https://en.wikipedia.org/wiki/Open_Location_Code) and [plus codes](https://plus.codes/).\n'
            )
            .optional(),
        price_level: z
            .number()
            .describe(
                'The price level of the place, on a scale of 0 to 4. The exact amount indicated by a specific value will vary from region to region. Price levels are interpreted as follows:\n- 0 Free\n- 1 Inexpensive\n- 2 Moderate\n- 3 Expensive\n- 4 Very Expensive\n'
            )
            .optional(),
        rating: z
            .number()
            .describe("Contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews.")
            .optional(),
        reference: z.string().optional(),
        reservable: z.boolean().describe('Specifies if the place supports reservations.').optional(),
        reviews: z
            .array(z.lazy(() => placeReviewSchema))
            .describe(
                'A JSON array of up to five reviews. By default, the reviews are sorted in order of relevance. Use the `reviews_sort` request parameter to control sorting.\n\n- For `most_relevant` (default), reviews are sorted by relevance; the service will bias the results to return reviews originally written in the preferred language.\n- For `newest`, reviews are sorted in chronological order; the preferred language does not affect the sort order.\nGoogle recommends indicating to users whether results are ordered by `most_relevant` or `newest`.\n'
            )
            .optional(),
        serves_beer: z.boolean().describe('Specifies if the place serves beer.').optional(),
        serves_breakfast: z.boolean().describe('Specifies if the place serves breakfast.').optional(),
        serves_brunch: z.boolean().describe('Specifies if the place serves brunch.').optional(),
        serves_dinner: z.boolean().describe('Specifies if the place serves dinner.').optional(),
        serves_lunch: z.boolean().describe('Specifies if the place serves lunch.').optional(),
        serves_vegetarian_food: z.boolean().describe('Specifies if the place serves vegetarian food.').optional(),
        serves_wine: z.boolean().describe('Specifies if the place serves wine.').optional(),
        scope: z.string().optional(),
        secondary_opening_hours: z
            .lazy(() => placeOpeningHoursSchema)
            .describe(
                "Contains an array of entries for the next seven days including information about secondary hours of a business. Secondary hours are different from a business's main hours. For example, a restaurant can specify drive through hours or delivery hours as its secondary hours. This field populates the `type` subfield, which draws from a predefined list of opening hours types (such as `DRIVE_THROUGH`, `PICKUP`, or `TAKEOUT`) based on the types of the place. This field includes the `special_days` subfield of all hours, set for dates that have exceptional hours."
            )
            .optional(),
        takeout: z.boolean().describe('Specifies if the business supports takeout.').optional(),
        types: z
            .array(z.string())
            .describe(
                'Contains an array of feature types describing the given result. See the list of [supported types](https://developers.google.com/maps/documentation/places/web-service/supported_types#table2).'
            )
            .optional(),
        url: z
            .string()
            .describe(
                'Contains the URL of the official Google page for this place. This will be the Google-owned page that contains the best available information about the place. Applications must link to or embed this page on any screen that shows detailed results about the place to the user.'
            )
            .optional(),
        user_ratings_total: z
            .number()
            .describe('The total number of reviews, with or without text, for this place.')
            .optional(),
        utc_offset: z
            .number()
            .describe(
                'Contains the number of minutes this place\u2019s current timezone is offset from UTC. For example, for places in Sydney, Australia during daylight saving time this would be 660 (+11 hours from UTC), and for places in California outside of daylight saving time this would be -480 (-8 hours from UTC).'
            )
            .optional(),
        vicinity: z
            .string()
            .describe(
                'For establishment (`types:["establishment", ...])` results only, the `vicinity` field contains a simplified address for the place, including the street name, street number, and locality, but not the province/state, postal code, or country.\n\nFor all other results, the `vicinity` field contains the name of the narrowest political (`types:["political", ...]`) feature that is present in the address of the result.\n\nThis content is meant to be read as-is. Do not programmatically parse the formatted address.\n'
            )
            .optional(),
        website: z
            .string()
            .describe("The authoritative website for this place, such as a business' homepage.")
            .optional(),
        wheelchair_accessible_entrance: z
            .boolean()
            .describe('Specifies if the place has an entrance that is wheelchair-accessible.')
            .optional(),
    })
    .describe('Attributes describing a place. Not all attributes will be available for all place types.');
