import { z } from 'zod';

/**
 * @description - `DRIVING` (default) indicates calculation using the road network.\n- `BICYCLING` requests calculation for bicycling via bicycle paths & preferred streets (where available).\n- `TRANSIT` requests calculation via public transit routes (where available). \n- `WALKING` requests calculation for walking via pedestrian paths & sidewalks (where available).\n
 */
export const travelModeSchema = z
    .enum(['DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING'])
    .describe(
        '- `DRIVING` (default) indicates calculation using the road network.\n- `BICYCLING` requests calculation for bicycling via bicycle paths & preferred streets (where available).\n- `TRANSIT` requests calculation via public transit routes (where available). \n- `WALKING` requests calculation for walking via pedestrian paths & sidewalks (where available).\n'
    );
