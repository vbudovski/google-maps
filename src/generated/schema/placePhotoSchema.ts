import { z } from 'zod';

/**
 * @description A photo of a Place. The photo can be accesed via the [Place Photo](https://developers.google.com/places/web-service/photos) API using an url in the following pattern:\n\n```\nhttps://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=photo_reference&key=YOUR_API_KEY\n```\n\nSee [Place Photos](https://developers.google.com/places/web-service/photos) for more information.\n
 */
export const placePhotoSchema = z
    .object({
        height: z.number().describe('The height of the photo.'),
        width: z.number().describe('The width of the photo.'),
        html_attributions: z.array(z.string()).describe('The HTML attributions for the photo.'),
        photo_reference: z.string().describe('A string used to identify the photo when you perform a Photo request.'),
    })
    .describe(
        'A photo of a Place. The photo can be accesed via the [Place Photo](https://developers.google.com/places/web-service/photos) API using an url in the following pattern:\n\n```\nhttps://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=photo_reference&key=YOUR_API_KEY\n```\n\nSee [Place Photos](https://developers.google.com/places/web-service/photos) for more information.\n'
    );

export const placePhotoQueryParamsSchema = z.object({
    photo_reference: z
        .string()
        .describe(
            'A string identifier that uniquely identifies a photo. Photo references are returned from either a Place Search or Place Details request.\n'
        ),
    maxheight: z
        .number()
        .describe(
            'Specifies the maximum desired height, in pixels, of the image. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between `1` and `1600`.\n'
        )
        .optional(),
    maxwidth: z
        .number()
        .describe(
            'Specifies the maximum desired width, in pixels, of the image. If the image is smaller than the values specified, the original image will be returned. If the image is larger in either dimension, it will be scaled to match the smaller of the two dimensions, restricted to its original aspect ratio. Both the `maxheight` and `maxwidth` properties accept an integer between `1` and `1600`.\n'
        )
        .optional(),
});
/**
 * @description 200 OK
 */
export const placePhoto200Schema = z.string();
/**
 * @description 200 OK
 */
export const placePhotoQueryResponseSchema = z.string();
