import { defineConfig } from '@kubb/core';
import { definePlugin as createSwagger } from '@kubb/swagger';
import { definePlugin as createSwaggerZod } from '@kubb/swagger-zod';

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
        createSwaggerZod({ dateType: 'date', output: { exportType: false, path: './schema' } }),
    ],
}));
