import { z } from 'zod';

export const latitudeLongitudeLiteralSchema = z
    .object({
        latitude: z.number().describe('Latitude in decimal degrees'),
        longitude: z.number().describe('Longitude in decimal degrees'),
    })
    .describe('An object describing a specific location with Latitude and Longitude in decimal degrees.');
