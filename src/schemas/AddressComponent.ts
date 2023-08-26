import { z } from 'zod';

import { Table2 } from './PlaceType';

const AddressComponent = z.object({
    long_name: z.string(),
    short_name: z.string(),
    types: z.array(Table2).nonempty(),
});

export { AddressComponent };
