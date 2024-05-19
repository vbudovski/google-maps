import { z } from 'zod';
import { boundsSchema } from './boundsSchema';
import { directionsLegSchema } from './directionsLegSchema';
import { directionsPolylineSchema } from './directionsPolylineSchema';
import { fareSchema } from './fareSchema';

/**
 * @description Routes consist of nested `legs` and `steps`.
 */
export const directionsRouteSchema = z
    .object({
        legs: z
            .array(z.lazy(() => directionsLegSchema))
            .describe(
                'An array which contains information about a leg of the route, between two locations within the given route. A separate leg will be present for each waypoint or destination specified. (A route with no waypoints will contain exactly one leg within the legs array.) Each leg consists of a series of steps.'
            ),
        bounds: z.lazy(() => boundsSchema),
        copyrights: z
            .string()
            .describe(
                'Contains an array of warnings to be displayed when showing these directions. You must handle and display these warnings yourself.'
            ),
        summary: z
            .string()
            .describe(
                'Contains a short textual description for the route, suitable for naming and disambiguating the route from alternatives.'
            ),
        waypoint_order: z
            .array(z.number())
            .describe(
                'An array indicating the order of any waypoints in the calculated route. This waypoints may be reordered if the request was passed optimize:true within its waypoints parameter.'
            ),
        warnings: z
            .array(z.string())
            .describe(
                'Contains an array of warnings to be displayed when showing these directions. You must handle and display these warnings yourself.'
            ),
        overview_polyline: z.lazy(() => directionsPolylineSchema),
        fare: z.lazy(() => fareSchema).optional(),
    })
    .describe('Routes consist of nested `legs` and `steps`.');
