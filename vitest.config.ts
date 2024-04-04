import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        clearMocks: true,
        setupFiles: ['dotenv/config'],
        coverage: {
            provider: 'v8',
            include: ['src/generated/zod-fetch', 'src/api', 'src/utils'],
        },
    },
});
