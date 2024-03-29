import { z } from 'zod';

export const directionsTransitVehicleSchema = z.object({
    icon: z.string().describe('Contains the URL for an icon associated with this vehicle type.').optional(),
    local_icon: z
        .string()
        .describe(
            'Contains the URL for the icon associated with this vehicle type, based on the local transport signage.'
        )
        .optional(),
    name: z.string().describe('The name of this vehicle, capitalized.'),
    type: z
        .enum([
            'BUS',
            'CABLE_CAR',
            'COMMUTER_TRAIN',
            'FERRY',
            'FUNICULAR',
            'GONDOLA_LIFT',
            'HEAVY_RAIL',
            'HIGH_SPEED_TRAIN',
            'INTERCITY_BUS',
            'LONG_DISTANCE_TRAIN',
            'METRO_RAIL',
            'MONORAIL',
            'OTHER',
            'RAIL',
            'SHARE_TAXI',
            'SUBWAY',
            'TRAM',
            'TROLLEYBUS',
        ])
        .describe(
            'The type of vehicle used.\n\n* `BUS` -\tBus.\n* `CABLE_CAR` -\tA vehicle that operates on a cable, usually on the ground. Aerial cable cars may be of the type GONDOLA_LIFT.\n* `COMMUTER_TRAIN` -\tCommuter rail.\n* `FERRY` -\tFerry.\n* `FUNICULAR` -\tA vehicle that is pulled up a steep incline by a cable. A Funicular typically consists of two cars, with each car acting as a counterweight for the other.\n* `GONDOLA_LIFT` -\tAn aerial cable car.\n* `HEAVY_RAIL` -\tHeavy rail.\n* `HIGH_SPEED_TRAIN` -\tHigh speed train.\n* `INTERCITY_BUS` -\tIntercity bus.\n* `LONG_DISTANCE_TRAIN` -\tLong distance train.\n* `METRO_RAIL` -\tLight rail transit.\n* `MONORAIL` -\tMonorail.\n* `OTHER` -\tAll other vehicles will return this type.\n* `RAIL` -\tRail.\n* `SHARE_TAXI` -\tShare taxi is a kind of bus with the ability to drop off and pick up passengers anywhere on its route.\n* `SUBWAY` -\tUnderground light rail.\n* `TRAM` -\tAbove ground light rail.\n* `TROLLEYBUS` -\tTrolleybus.\n'
        ),
});
