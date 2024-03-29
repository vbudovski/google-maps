import { z } from 'zod';

export const fareSchema = z
    .object({
        currency: z
            .string()
            .describe(
                'An [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217) indicating the currency that the amount is expressed in.'
            ),
        value: z.number().describe('The total fare amount, in the currency specified.'),
        text: z.string().describe('The total fare amount, formatted in the requested language.'),
    })
    .describe(
        'The total fare for the route.\n\n```\n{\n  "currency" : "USD",\n  "value" : 6,\n  "text" : "$6.00"\n}\n```\n'
    );
