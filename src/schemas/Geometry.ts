import { z } from 'zod';

const LatLngLiteral = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
});

const Bounds = z.object({
    northeast: LatLngLiteral,
    southwest: LatLngLiteral,
});

const Geometry = z.object({
    location: LatLngLiteral,
    viewport: Bounds,
});

export { Geometry };
