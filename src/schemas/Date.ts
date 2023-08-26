import { z } from 'zod';

// TODO: Validate valid date value?
const ISODate = z.string().regex(/\d{4}-\d{2}-\d{2}/, 'Invalid date string.');

export { ISODate };
