import { z } from 'zod';

/**
 * @description Attributes used to describe a cell tower. The following optional fields are not currently used, but may be included if values are available: `age`, `signalStrength`, `timingAdvance`.
 */
export const cellTowerSchema = z
    .object({
        cellId: z
            .number()
            .describe(
                'Unique identifier of the cell. On GSM, this is the Cell ID (CID); CDMA networks use the Base Station ID (BID). WCDMA networks use the UTRAN/GERAN Cell Identity (UC-Id), which is a 32-bit value concatenating the Radio Network Controller (RNC) and Cell ID. Specifying only the 16-bit Cell ID value in WCDMA networks may return inaccurate results.'
            ),
        locationAreaCode: z
            .number()
            .describe(
                'The Location Area Code (LAC) for GSM and WCDMA networks. The Network ID (NID) for CDMA networks.'
            ),
        mobileCountryCode: z.number().describe("The cell tower's Mobile Country Code (MCC)."),
        mobileNetworkCode: z
            .number()
            .describe(
                "The cell tower's Mobile Network Code. This is the MNC for GSM and WCDMA; CDMA uses the System ID (SID)."
            ),
        age: z
            .number()
            .describe(
                'The number of milliseconds since this cell was primary. If age is 0, the cellId represents a current measurement.'
            )
            .optional(),
        signalStrength: z.number().describe('Radio signal strength measured in dBm.').optional(),
        timingAdvance: z.number().describe('The timing advance value.').optional(),
    })
    .describe(
        'Attributes used to describe a cell tower. The following optional fields are not currently used, but may be included if values are available: `age`, `signalStrength`, `timingAdvance`.'
    );
