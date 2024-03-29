import { z } from 'zod';

export const placeReviewSchema = z
    .object({
        author_name: z
            .string()
            .describe(
                'The name of the user who submitted the review. Anonymous reviews are attributed to "A Google user".'
            ),
        author_url: z
            .string()
            .describe("The URL to the user's Google Maps Local Guides profile, if available.")
            .optional(),
        profile_photo_url: z.string().describe("The URL to the user's profile photo, if available.").optional(),
        language: z
            .string()
            .describe(
                "An IETF language code indicating the language of the returned review.\nThis field contains the main language tag only, and not the secondary tag indicating country or region. For example, all the English reviews are tagged as 'en', and not 'en-AU' or 'en-UK' and so on.\nThis field is empty if there is only a rating with no review text. \n"
            )
            .optional(),
        original_language: z
            .string()
            .describe(
                "An IETF language code indicating the original language of the review. If the review has been translated, then `original_language` != `language`.\nThis field contains the main language tag only, and not the secondary tag indicating country or region. For example, all the English reviews are tagged as 'en', and not 'en-AU' or 'en-UK' and so on.\nThis field is empty if there is only a rating with no review text.\n"
            )
            .optional(),
        rating: z
            .number()
            .describe("The user's overall rating for this place. This is a whole number, ranging from 1 to 5."),
        relative_time_description: z
            .string()
            .describe('The time that the review was submitted in text, relative to the current time.'),
        text: z
            .string()
            .describe(
                "The user's review. When reviewing a location with Google Places, text reviews are considered optional. Therefore, this field may be empty. Note that this field may include simple HTML markup. For example, the entity reference `&amp;` may represent an ampersand character."
            )
            .optional(),
        time: z
            .number()
            .describe(
                'The time that the review was submitted, measured in the number of seconds since since midnight, January 1, 1970 UTC.'
            ),
        translated: z
            .boolean()
            .describe(
                'A boolean value indicating if the review was translated from the original language it was written in.\nIf a review has been translated, corresponding to a value of true, Google recommends that you indicate this to your users. For example, you can add the following string, \u201CTranslated by Google\u201D, to the review.\n'
            )
            .optional(),
    })
    .describe('A review of the place submitted by a user.');
