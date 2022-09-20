# OPManga

## Get started on Netlify-Express App locally

The most recent information from 2018 confirms that Netlify [does not support sub-folders](https://github.com/netlify/build-image/issues/81) (though there is discussion about adding it to the UI). Therefore all of your project files must exist in the root. It should be noted that while your Netlify routes exist in[`server.js`](https://github.com/king-melchizedek/Netlify-Express/blob/master/express/server.js), your local routes exist as separate files in the [`routes`](https://github.com/king-melchizedek/Netlify-Express/tree/master/routes) subdirectory. Any changes in these files during development must be manually changed in the [`server.js`](https://github.com/king-melchizedek/Netlify-Express/blob/master/express/server.js) file to take effect on Netlify.

To get started, ensure you have [Node.js](https://nodejs.org/en/) installed, then:

``` bash
npm install
npm start
```

### Entry Point

[`server-local.js`](server-local.js) is our entry point. If you have nodemon, run:

``` bash
nodemon server-local.js
```

### Pug on Netlify

Pug [isn't supported](https://dev.to/spekulatius1984/how-to-use-pug-on-netlify-3le0) on Netlify. Use pug-cli to compile pug into html.

``` bash
npm install pug-cli
node node_modules/pug-cli/index.js pug/ --out ./views
```

Be sure the build command on Netlify includes the PUG conversion (set in the [`netlify.toml](https://github.com/king-melchizedek/Netlify-Express/blob/master/netlify.toml) file):

``` bash
npm install && npm run build && node node_modules/pug-cli/index.js views/ --out ./
```
