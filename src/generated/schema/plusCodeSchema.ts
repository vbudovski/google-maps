import { z } from 'zod';

export const plusCodeSchema = z
    .object({
        compound_code: z
            .string()
            .describe(
                'The `compound_code` is a 6 character or longer local code with an explicit location (`CWC8+R9, Mountain View, CA, USA`). Some APIs may return an empty string if the `compound_code` is not available.'
            )
            .optional(),
        global_code: z
            .string()
            .describe(
                'The `global_code` is a 4 character area code and 6 character or longer local code (`849VCWC8+R9`).'
            ),
    })
    .describe(
        'An encoded location reference, derived from latitude and longitude coordinates, that represents an area, 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator) or smaller. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named).'
    );
