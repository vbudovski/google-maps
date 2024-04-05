import { z } from 'zod';

export const latLngLiteralSchema = z
    .object({
        lat: z.number().describe('Latitude in decimal degrees'),
        lng: z.number().describe('Longitude in decimal degrees'),
    })
    .describe('An object describing a specific location with Latitude and Longitude in decimal degrees.');
