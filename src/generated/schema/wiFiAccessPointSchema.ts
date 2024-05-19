import { z } from 'zod';

/**
 * @description Attributes used to describe a WiFi access point.
 */
export const wiFiAccessPointSchema = z
    .object({
        macAddress: z
            .string()
            .describe(
                "The MAC address of the WiFi node. It's typically called a BSS, BSSID or MAC address. Separators must be `:` (colon)."
            ),
        signalStrength: z.number().describe('The current signal strength measured in dBm.').optional(),
        signalToNoiseRatio: z.number().describe('The current signal to noise ratio measured in dB.').optional(),
        age: z.number().describe('The number of milliseconds since this access point was detected.').optional(),
        channel: z
            .number()
            .describe('The channel over which the client is communication with the access point.')
            .optional(),
    })
    .describe('Attributes used to describe a WiFi access point.');
