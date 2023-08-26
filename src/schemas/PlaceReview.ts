import { z } from 'zod';

const PlaceReview = z.object({
    author_name: z.string(),
    rating: z.number().min(1).max(5).int(),
    relative_time_description: z.string(),
    time: z.number().min(0),
    author_url: z.string().url().optional(),
    language: z.string().optional(),
    original_language: z.string().optional(),
    profile_photo_url: z.string().url().optional(),
    text: z.string().optional(),
    translated: z.boolean().optional(),
});

export { PlaceReview };
