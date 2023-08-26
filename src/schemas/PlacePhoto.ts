import { z } from 'zod';

const PlacePhoto = z.object({
    height: z.number().min(1),
    html_attributions: z.string().array(),
    photo_reference: z.string(),
    width: z.number().min(1),
});

export { PlacePhoto };
