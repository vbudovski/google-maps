import { z } from 'zod';

import { AddressComponent } from './AddressComponent';

test('AddressComponent', () => {
    const data = {
        long_name: 'Hello, world!',
        short_name: 'Hello',
        types: ['landmark'],
    } satisfies z.infer<typeof AddressComponent>;

    AddressComponent.parse(data);
});
