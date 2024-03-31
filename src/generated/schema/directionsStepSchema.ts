import { z } from 'zod';
import { directionsPolylineSchema } from './directionsPolylineSchema';
import { directionsTransitDetailsSchema } from './directionsTransitDetailsSchema';
import { latLngLiteralSchema } from './latLngLiteralSchema';
import { textValueObjectSchema } from './textValueObjectSchema';
import { travelModeSchema } from './travelModeSchema';

export const directionsStepSchema = z
    .object({
        distance: z
            .lazy(() => textValueObjectSchema)
            .describe(
                'Contains the distance covered by this step until the next step. This field may be undefined if the distance is unknown.'
            )
            .optional(),
        duration: z
            .lazy(() => textValueObjectSchema)
            .describe(
                'Contains the typical time required to perform the step, until the next step. This field may be undefined if the duration is unknown.'
            ),
        end_location: z
            .lazy(() => latLngLiteralSchema)
            .describe('Contains the location of the last point of this step.'),
        html_instructions: z
            .string()
            .describe(
                'Contains formatted instructions for this step, presented as an HTML text string. This content is meant to be read as-is. Do not programmatically parse this display-only content.'
            ),
        maneuver: z
            .enum([
                'turn-slight-left',
                'turn-sharp-left',
                'turn-left',
                'turn-slight-right',
                'turn-sharp-right',
                'keep-right',
                'keep-left',
                'uturn-left',
                'uturn-right',
                'turn-right',
                'straight',
                'ramp-left',
                'ramp-right',
                'merge',
                'fork-left',
                'fork-right',
                'ferry',
                'ferry-train',
                'roundabout-left',
                'roundabout-right',
            ])
            .describe(
                'Contains the action to take for the current step (turn left, merge, straight, etc.). Values are subject to change, and new values may be introduced without prior notice.'
            )
            .optional(),
        polyline: z
            .lazy(() => directionsPolylineSchema)
            .describe(
                'Contains a single points object that holds an [encoded polyline](https://developers..google.com/maps/documentation/utilities/polylinealgorithm) representation of the step. This polyline is an approximate (smoothed) path of the step.'
            ),
        start_location: z
            .lazy(() => latLngLiteralSchema)
            .describe('Contains the location of the starting point of this step.'),
        transit_details: z
            .lazy(() => directionsTransitDetailsSchema)
            .describe('Details pertaining to this step if the travel mode is `TRANSIT`.')
            .optional(),
        travel_mode: z.lazy(() => travelModeSchema).describe('Contains the type of travel mode used.'),
        steps: z.unknown().optional(),
    })
    .describe(
        'Each element in the steps array defines a single step of the calculated directions. A step is the most atomic unit of a direction\'s route, containing a single step describing a specific, single instruction on the journey. E.g. "Turn left at W. 4th St." The step not only describes the instruction but also contains distance and duration information relating to how this step relates to the following step. For example, a step denoted as "Merge onto I-80 West" may contain a duration of "37 miles" and "40 minutes," indicating that the next step is 37 miles/40 minutes from this step.\n\nWhen using the Directions API to search for transit directions, the steps array will include additional transit details in the form of a transit_details array. If the directions include multiple modes of transportation, detailed directions will be provided for walking or driving steps in an inner steps array. For example, a walking step will include directions from the start and end locations: "Walk to Innes Ave & Fitch St". That step will include detailed walking directions for that route in the inner steps array, such as: "Head north-west", "Turn left onto Arelious Walker", and "Turn left onto Innes Ave".\n'
    );
