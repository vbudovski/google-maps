import { createZodFetcher } from 'zod-fetch';

async function customFetcher(...args: Parameters<typeof fetch>) {
    const response = await fetch(...args);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.headers.get('content-type')?.split(';')[0] === 'application/json') {
        return response.json();
    }

    return response.text();
}

const fetcher = createZodFetcher(customFetcher);

export { fetcher };
