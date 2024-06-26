import { z } from 'zod';

/**
 * @description An object containing a numeric value and its formatted text representation.
 */
export const textValueObjectSchema = z
    .object({ text: z.string().describe('String value.'), value: z.number().describe('Numeric value.') })
    .describe('An object containing a numeric value and its formatted text representation.');
