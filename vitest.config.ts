import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        clearMocks: true,
        globals: true,
        setupFiles: ['dotenv/config'],
        coverage: {
            provider: 'v8',
            include: ['src/generated/zod-fetch'],
        },
    },
});
