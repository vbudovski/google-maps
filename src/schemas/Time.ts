import { z } from 'zod';

// TODO: Validate range between 0000 and 2359.
const HHMM = z.string().regex(/\d{4}/);

export { HHMM };
