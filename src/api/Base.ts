type Method = 'GET' | 'PATCH' | 'PUT' | 'POST' | 'DELETE';

abstract class Base {
    private readonly baseUrl: string = 'https://maps.googleapis.com/maps/api/';
    private readonly apiKey: string;

    protected constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    protected async callEndpoint(
        method: Method,
        path: string,
        searchParams: URLSearchParams = new URLSearchParams()
    ): Promise<Response> {
        const url = new URL(`${path}?${searchParams}`, this.baseUrl);
        url.searchParams.set('key', this.apiKey);

        return fetch(url, { method });
    }
}

export { Base };
