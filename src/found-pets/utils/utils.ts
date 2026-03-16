import { envs } from "src/config/envs";

export const generateMapboxStaticImage = (
    lostLat: number,
    lostLon: number,
    foundLat: number,
    foundLon: number,
): string => {
    const zoom = 14;
    const width = 600;
    const height = 300;

    const lostPin = `pin-s-l+f00(${lostLon},${lostLat})`;
    const foundPin = `pin-s-l+0a0(${foundLon},${foundLat})`;

    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lostPin},${foundPin}/${foundLon},${foundLat},${zoom}/${width}x${height}?access_token=${envs.MAPBOX_TOKEN}`;
};