import { z } from 'zod';

const PlusCode = z.object({
    global_code: z.string(),
    compound_code: z.string().optional(),
});

export { PlusCode };
