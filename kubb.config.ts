import { defineConfig } from '@kubb/core';
import { definePlugin as createSwagger } from '@kubb/swagger';
import { definePlugin as createSwaggerClient } from '@kubb/swagger-client';
import { definePlugin as createSwaggerZod } from '@kubb/swagger-zod';
import { templates } from './src/templates/client';

export default defineConfig(async () => ({
    root: '.',
    input: {
        data: await fetch(
            'https://github.com/googlemaps/openapi-specification/releases/latest/download/google-maps-platform-openapi3.yml'
        ).then(response => response.text()),
    },
    output: {
        path: 'src/generated',
        clean: true,
    },
    plugins: [
        createSwagger({ output: false }),
        createSwaggerZod({
            dateType: 'date',
            unknownType: 'unknown',
            output: { exportType: false, path: './schema' },
            templates: {
                operations: false,
            },
        }),
        createSwaggerClient({
            output: { exportType: false, path: './zod-fetch' },
            group: { type: 'tag', output: 'zod-fetch/{{tag}}' },
            templates: {
                client: templates,
                operations: false,
            },
        }),
    ],
}));
