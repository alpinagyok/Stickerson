## StickerSon

#### Status - In development

[Live Vesrion](https://stickerson.herokuapp.com)

This is responsive website project made with NodeJS (Express) + React + MongoDB. The user can browse the website and see different sticker mockups (products) created by other users. Users can create a store (to create products), order (no payment now, just simulation) products and make reviews.

## Keys file for local deployment:

```javascript
module.exports = {
  mongoURL: "",
  secret: "",
  cloudinary_name: "",
  cloudinary_key: "",
  cloudinary_secret: "",
  printful_key: "",
};
```

## Config Vars needed for Heroku:

#### `CLOUDINARY_API_KEY`

#### `CLOUDINARY_API_SECRET`

#### `CLOUDINARY_CLOUD_NAME`

#### `MONGODB_URL`

#### `PRINTFUL_API_KEY`

#### `SECRET`

## Available NPM Scripts

In the project directory, you can run:

### `npm run start`

Runs Node server on localhost.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run server`

Runs Node server in the development mode (Nodemon).<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run client`

Runs the React app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Runs 'server' and 'client' scripts concurrently.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

