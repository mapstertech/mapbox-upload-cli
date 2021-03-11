# Mapbox Upload CLI
> A CLI for uploading tilesets to Mapbox Studio

## Getting Started

> You must have a Mapbox account and [create an Access Token](https://account.mapbox.com/access-tokens/create) with the scopes `uploads:write`, `uploads:read`, and `uploads:list` enabled before using this service.

Run `npm start` in the program folder. Input your Access Token and Username when prompted. You'll be asked to select a `.tiff` file to upload and finally choose a name for your Tileset. When this is complete, your file will be uploaded to S3 and subsequently uploaded to Mapbox Studio. Once complete, you can check Mapbox Studio to checkout your tileset!
