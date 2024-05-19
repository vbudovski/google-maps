import { z } from 'zod';
import { cellTowerSchema } from './cellTowerSchema';
import { wiFiAccessPointSchema } from './wiFiAccessPointSchema';

/**
 * @description The request body must be formatted as JSON. The following fields are supported, and all fields are optional.
 */
export const geolocationRequestSchema = z
    .object({
        homeMobileCountryCode: z.number().describe("The cell tower's Mobile Country Code (MCC).").optional(),
        homeMobileNetworkCode: z
            .number()
            .describe(
                "The cell tower's Mobile Network Code. This is the MNC for GSM and WCDMA; CDMA uses the System ID (SID)."
            )
            .optional(),
        radioType: z
            .string()
            .describe(
                'The mobile radio type. Supported values are lte, gsm, cdma, and wcdma. While this field is optional, it should be included if a value is available, for more accurate results.'
            )
            .optional(),
        carrier: z.string().describe('The carrier name.').optional(),
        considerIp: z
            .string()
            .describe(
                'Specifies whether to fall back to IP geolocation if wifi and cell tower signals are not available. Defaults to true. Set considerIp to false to disable fall back.'
            )
            .optional(),
        cellTowers: z
            .array(z.lazy(() => cellTowerSchema))
            .describe("The request body's cellTowers array contains zero or more cell tower objects.")
            .optional(),
        wifiAccessPoints: z
            .array(z.lazy(() => wiFiAccessPointSchema))
            .describe('An array of two or more WiFi access point objects.')
            .optional(),
    })
    .describe(
        'The request body must be formatted as JSON. The following fields are supported, and all fields are optional.'
    );
