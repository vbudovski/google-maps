import { z } from 'zod';

const HasKey = z.object({ key: z.string().nonempty().describe('Google Maps API key.') });

function isOptional<T extends z.ZodObject<z.ZodRawShape>>(schema: z.ZodOptional<T> | T): schema is z.ZodOptional<T> {
    return schema.isOptional();
}

function withKey<T extends z.ZodRawShape>(schema: z.ZodOptional<z.ZodObject<T>> | z.ZodObject<T>) {
    if (isOptional(schema)) {
        return schema.unwrap().merge(HasKey).optional();
    }

    return schema.merge(HasKey);
}

type NonEmptyArray<ElementT> = ElementT[] & {
    0: ElementT;
    at: (index: 0) => ElementT;
};

function isNonEmptyArray<ElementT>(array: ElementT[]): array is NonEmptyArray<ElementT> {
    return array.length > 0;
}

function urlWithParams(path: string, base: string, parsedParams: Record<string, unknown> = {}) {
    const url = new URL(path, base);
    for (const [name, value] of Object.entries(parsedParams)) {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                const strings = value.map(v => String(v));
                if (isNonEmptyArray(strings)) {
                    const separator = strings.at(0).includes(',') ? '|' : ',';

                    url.searchParams.set(name, value.join(separator));
                }
            } else {
                url.searchParams.set(name, String(value));
            }
        }
    }

    return url;
}

export { withKey, urlWithParams };
