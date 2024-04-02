import { z } from 'zod';

const HasKey = z.object({ key: z.string().nonempty().describe('Google Maps API key.') });

function isOptional<T extends z.ZodObject<z.ZodRawShape>>(schema: z.ZodOptional<T> | T): schema is z.ZodOptional<T> {
    return schema.isOptional();
}

function withKey<T extends z.ZodObject<z.ZodRawShape>>(schema: z.ZodOptional<T> | T) {
    if (isOptional(schema)) {
        return schema.unwrap().merge(HasKey).optional();
    }

    return schema.merge(HasKey);
}

export { withKey };
