'use strict';

const path = require('path');
const inform = require('./lib/inform');
const drizzle = require('drizzle-builder');
const helpers = require('@cloudfour/hbs-helpers');
const assembleHelpers = require('handlebars-helpers');
const ifProd = require('@sparkbox/if-prod');
const shelljs = require('shelljs');
const _ = require('lodash');

const defaultOptions = {
  beautifier: {
    /* eslint-disable camelcase */
    indent_char: ' ',
    indent_size: 2,
    indent_with_tabs: false,
    max_preserve_newlines: 1,
    wrap_line_length: 0,
    unformatted:
      `a abbr acronym address b bdo big cite code col del dfn dt em font
        h1 h2 h3 h4 h5 h6 i img ins kbd mark pre q s samp small span
        strike strong sub sup tt u var`.split(' '),
    /* eslint-enable camelcase */
  },
  fieldParsers: {
    notes: 'markdown',
  },
};

Object.assign(helpers, { ifProd });
Object.assign(helpers, { split: assembleHelpers().split });

// array helpers
Object.assign(helpers, { after: assembleHelpers().after });
Object.assign(helpers, { arrayify: assembleHelpers().arrayify });
Object.assign(helpers, { before: assembleHelpers().before });
Object.assign(helpers, { eachIndex: assembleHelpers().eachIndex });
Object.assign(helpers, { filter: assembleHelpers().filter });
Object.assign(helpers, { first: assembleHelpers().first });
Object.assign(helpers, { forEach: assembleHelpers().forEach });
Object.assign(helpers, { inArray: assembleHelpers().inArray });
Object.assign(helpers, { isArray: assembleHelpers().isArray });
Object.assign(helpers, { itemAt: assembleHelpers().itemAt });
Object.assign(helpers, { join: assembleHelpers().join });
Object.assign(helpers, { equalsLengt: assembleHelpers().equalsLengt });
Object.assign(helpers, { last: assembleHelpers().last });
Object.assign(helpers, { length: assembleHelpers().length });
Object.assign(helpers, { lengthEqual: assembleHelpers().lengthEqual });
Object.assign(helpers, { map: assembleHelpers().map });
Object.assign(helpers, { pluck: assembleHelpers().pluck });
Object.assign(helpers, { revers: assembleHelpers().revers });
Object.assign(helpers, { some: assembleHelpers().some });
Object.assign(helpers, { sort: assembleHelpers().sort });
Object.assign(helpers, { sortBy: assembleHelpers().sortBy });
Object.assign(helpers, { withAfter: assembleHelpers().withAfter });
Object.assign(helpers, { withBefore: assembleHelpers().withBefore });
Object.assign(helpers, { withFirst: assembleHelpers().withFirst });
Object.assign(helpers, { withGroup: assembleHelpers().withGroup });
Object.assign(helpers, { withLast: assembleHelpers().withLast });
Object.assign(helpers, { withSort: assembleHelpers().withSort });
Object.assign(helpers, { unique: assembleHelpers().unique });

//comparison helpers
Object.assign(helpers, { and: assembleHelpers().and });
Object.assign(helpers, { compare: assembleHelpers().compare });
Object.assign(helpers, { contains: assembleHelpers().contains });
Object.assign(helpers, { default: assembleHelpers().default });
Object.assign(helpers, { eq: assembleHelpers().eq });
Object.assign(helpers, { gt: assembleHelpers().gt });
Object.assign(helpers, { gte: assembleHelpers().gte });
Object.assign(helpers, { has: assembleHelpers().has });
Object.assign(helpers, { isFalsey: assembleHelpers().isFalsey });
Object.assign(helpers, { isTruthy: assembleHelpers().isTruthy });
Object.assign(helpers, { ifEven: assembleHelpers().ifEven });
Object.assign(helpers, { ifNth: assembleHelpers().ifNth });
Object.assign(helpers, { ifOdd: assembleHelpers().ifOdd });
Object.assign(helpers, { is: assembleHelpers().is });
Object.assign(helpers, { isnt: assembleHelpers().isnt });
Object.assign(helpers, { lt: assembleHelpers().lt });
Object.assign(helpers, { lte: assembleHelpers().lte });
Object.assign(helpers, { neither: assembleHelpers().neither });
Object.assign(helpers, { not: assembleHelpers().not });
Object.assign(helpers, { or: assembleHelpers().or });
Object.assign(helpers, { unlessEq: assembleHelpers().unlessEq });
Object.assign(helpers, { unlessGt: assembleHelpers().unlessGt });
Object.assign(helpers, { unlessLt: assembleHelpers().unlessLt });
Object.assign(helpers, { unlessGteq: assembleHelpers().unlessGteq });
Object.assign(helpers, { unlessLteq: assembleHelpers().unlessLteq });

// date helpers
Object.assign(helpers, { year: assembleHelpers().year });
Object.assign(helpers, { date: assembleHelpers().date });
Object.assign(helpers, { moment: assembleHelpers().moment });

// fs helpers
Object.assign(helpers, { fileSize: assembleHelpers().fileSize });
Object.assign(helpers, { read: assembleHelpers().read });
Object.assign(helpers, { readdir: assembleHelpers().readdir });

// match helpers
Object.assign(helpers, { match: assembleHelpers().match });
Object.assign(helpers, { isMatch: assembleHelpers().isMatch });
Object.assign(helpers, { mm: assembleHelpers().mm });

// math helpers
Object.assign(helpers, { abs: assembleHelpers().abs });
Object.assign(helpers, { add: assembleHelpers().add });
Object.assign(helpers, { avg: assembleHelpers().avg });
Object.assign(helpers, { ceil: assembleHelpers().ceil });
Object.assign(helpers, { divide: assembleHelpers().divide });
Object.assign(helpers, { floor: assembleHelpers().floor });
Object.assign(helpers, { minus: assembleHelpers().minus });
Object.assign(helpers, { modulo: assembleHelpers().modulo });
Object.assign(helpers, { multiply: assembleHelpers().multiply });
Object.assign(helpers, { plus: assembleHelpers().plus });
Object.assign(helpers, { random: assembleHelpers().random });
Object.assign(helpers, { remainder: assembleHelpers().remainder });
Object.assign(helpers, { round: assembleHelpers().round });
Object.assign(helpers, { subtract: assembleHelpers().subtract });
Object.assign(helpers, { sum: assembleHelpers().sum });
Object.assign(helpers, { times: assembleHelpers().times });

// object helpers
Object.assign(helpers, { extend: assembleHelpers().extend });
Object.assign(helpers, { forIn: assembleHelpers().forIn });
Object.assign(helpers, { forOwn: assembleHelpers().forOwn });
Object.assign(helpers, { toPath: assembleHelpers().toPath });
Object.assign(helpers, { get: assembleHelpers().get });
Object.assign(helpers, { getObject: assembleHelpers().getObject });
Object.assign(helpers, { hasOwn: assembleHelpers().hasOwn });
Object.assign(helpers, { isObject: assembleHelpers().isObject });
Object.assign(helpers, { JSONparse: assembleHelpers().JSONparse });
Object.assign(helpers, { JSONstringify: assembleHelpers().JSONstringify });
Object.assign(helpers, { merge: assembleHelpers().merge });
Object.assign(helpers, { parseJSON: assembleHelpers().parseJSON });
Object.assign(helpers, { pick: assembleHelpers().pick });
Object.assign(helpers, { stringify: assembleHelpers().stringify });

// path helpers
Object.assign(helpers, { absolute: assembleHelpers().absolute});
Object.assign(helpers, { dirname: assembleHelpers().dirname});
Object.assign(helpers, { relative: assembleHelpers().relative});
Object.assign(helpers, { basename: assembleHelpers().basename});
Object.assign(helpers, { stem: assembleHelpers().stem});
Object.assign(helpers, { extname: assembleHelpers().extname});
Object.assign(helpers, { resolve: assembleHelpers().resolve});
Object.assign(helpers, { segments: assembleHelpers().segments});

// url helpers
Object.assign(helpers, { encodeURI: assembleHelpers().encodeURI });
Object.assign(helpers, { escape: assembleHelpers().escape });
Object.assign(helpers, { decodeURI: assembleHelpers().decodeURI });
Object.assign(helpers, { url_encode: assembleHelpers().url_encode });
Object.assign(helpers, { url_decode: assembleHelpers().url_decode });
Object.assign(helpers, { urlResolve: assembleHelpers().urlResolve });
Object.assign(helpers, { urlParse: assembleHelpers().urlParse });
Object.assign(helpers, { stripQuerystring: assembleHelpers().stripQuerystring });
Object.assign(helpers, { stripProtocol: assembleHelpers().stripProtocol });

Object.assign(defaultOptions, { helpers });

function printUpdatedFiles(tree, depth = 1) {
  if (depth > 5) return;
  if (tree.url) {
    inform.msg(`${tree.url}`);
  } else if (tree instanceof Object) {
    for (const key of Object.keys(tree)) {
      printUpdatedFiles(tree[key], depth + 1);
    }
  }
}

module.exports = function patterns(opts, callback) {
  inform.start('☔️');
  _.defaultsDeep(opts, defaultOptions);

  drizzle(opts).then((data) => {
    inform.msg('\nGenerated Templates\n');
    printUpdatedFiles(data);
    if (callback) callback();
  }).catch(err => console.log('err', err));

  shelljs.mkdir('-p', path.resolve('.', opts.dest.css));
  shelljs.cp(path.resolve(__dirname, 'css/drizzle.css'), path.resolve('.', opts.dest.css));
  shelljs.mkdir(path.resolve('.', opts.dest.js));
  shelljs.cp(path.resolve(__dirname, 'dist/drizzle.js'), path.resolve('.', opts.dest.js));
};
