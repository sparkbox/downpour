# Downpour

Sparkbox implementation of [drizzle-builder].

## Usage

Downpour exposes the [drizzle-builder] as a function to compile handlebars templates into HTML.

All [drizzle-builder options][drizzle-builder-options] are valid.

Downpour includes a few handlebars helpers by default:

- all [@cloudfour/hbs-helpers][hbs-helpers]
- [ifProd][sbx-ifprod-helper]
- [is][assemble]
- [isn't][assemble]
- [split][assemble]

To add additional helpers create a `helpers` key in the options object like so:

``` javascript
import downpour from '@sparkbox/downpour';
import { myHelperFunc } from 'my-helper-package';

const opts = {
  helpers: {
    myHelper: myHelperFunc,
  },
};

downpour(opts, cb);
```

## Publishing to NPM

See [contributing] docs.

[assemble]: https://github.com/helpers/handlebars-helpers
[contributing]: ./CONTRIBUTING.md
[drizzle-builder-options]: https://github.com/cloudfour/drizzle-builder#options
[drizzle-builder]: https://www.npmjs.com/package/drizzle-builder
[hbs-helpers]: https://github.com/cloudfour/core-hbs-helpers/tree/master/lib
[sbx-ifprod-helper]: https://github.com/sparkbox/ifProd-helper
[semantic-versioning]: https://docs.npmjs.com/about-semantic-versioning
