import { z } from 'zod';
import { directionsTransitAgencySchema } from './directionsTransitAgencySchema';
import { directionsTransitVehicleSchema } from './directionsTransitVehicleSchema';

export const directionsTransitLineSchema = z.object({
    agencies: z
        .array(z.lazy(() => directionsTransitAgencySchema))
        .describe('The transit agency (or agencies) that operates this transit line.'),
    color: z.string().describe('The color commonly used in signage for this line.').optional(),
    name: z.string().describe('The full name of this transit line, e.g. "8 Avenue Local".'),
    short_name: z
        .string()
        .describe('The short name of this transit line. This will normally be a line number, such as "M7" or "355".')
        .optional(),
    text_color: z.string().describe('The color commonly used in signage for this line.').optional(),
    url: z.string().describe('Contains the URL for this transit line as provided by the transit agency.').optional(),
    icon: z.string().describe('Contains the URL for the icon associated with this line.').optional(),
    vehicle: z
        .lazy(() => directionsTransitVehicleSchema)
        .describe('The type of vehicle that operates on this transit line.')
        .optional(),
});
