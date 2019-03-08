# Downpour

Sparkbox implementation of [drizzle-builder][db]


## Usage

Downpour exposes the [drizzle-builder][db] as a function to compile handlebars templates into HTML.

All [drizzle-builder options](https://github.com/cloudfour/drizzle-builder#options) are valid.

Downpour includes a few handlebars helpers by default:

- all [@cloudfour/hbs-helpers](https://github.com/cloudfour/core-hbs-helpers/tree/master/lib)
- [ifProd](https://github.com/sparkbox/ifProd-helper)
- [is][assemble]
- [isn't][assemble]
- [split][assemble]

To add additional helpers create a `helpers` key in the options object like so:

``` javascript
const downpour = require('downpour');
const { myHelperFunc } = require('my-helper-package');

const opts = {
  helpers: {
    myHelper: myHelperFunc,
  },
};

downpour(opts, cb);

```


[db]: https://www.npmjs.com/package/drizzle-builder
[assemble]: https://github.com/helpers/handlebars-helpers


## Publishing to NPM

1. Update the version number in `package.json` using [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).
1. Run `npm install` to update `package-lock.json` and commit both files.
1. Pull down the latest version of master and run `npm publish`.
