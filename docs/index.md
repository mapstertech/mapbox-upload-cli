## Mapbox Upload CLI

This is a small CLI tool that will make uploading large files to Mapbox much easier. Following Mapbox's documentation at [the Uploads API page](https://docs.mapbox.com/api/maps/uploads/) can be a bit cumbersome and difficult for new users (and even for experienced ones). So we made a simple command line tool to do it all for you!

See the [limits for Mapbox's upload sizes here](https://docs.mapbox.com/help/troubleshooting/uploads/#accepted-file-types-and-transfer-limits), and enjoy using the tool.

### Usage

You must have a Mapbox account and create an Access Token with the scopes uploads:write, uploads:read, and uploads:list enabled before using this service.

Clone this respository to your local machine. Run `npm install`, then `npm start` in the folder. Input your Access Token and Username when prompted. You'll be asked to select a file to upload (this can be a .tiff or any other allowed file type) and finally choose a name for your Tileset. When this is complete, your file will be uploaded to S3 and subsequently uploaded to Mapbox Studio. Once complete, you can check Mapbox Studio to verify your tileset!

### Support or Contact

Having any trouble? Get in touch with us at [https://mapster.me](https://mapster.me).
