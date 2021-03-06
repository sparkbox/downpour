import path from 'path';
import drizzle from 'drizzle-builder';
import helpers from '@cloudfour/hbs-helpers';
import assembleHelpers from 'handlebars-helpers';
import ifProd from '@sparkbox/if-prod';
import shelljs from 'shelljs';
import _ from 'lodash';
import inform from './inform';
import pkg from '../../package.json';

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
Object.assign(helpers, { is: assembleHelpers().is });
Object.assign(helpers, { isnt: assembleHelpers().isnt });
Object.assign(helpers, { split: assembleHelpers().split });
Object.assign(defaultOptions, { helpers });

function printUpdatedFiles(tree, depth = 1) {
  if (depth > 5) return;
  if (tree.url) {
    inform.msg(`${tree.url}`);
  } else if (tree instanceof Object) {
    Object.keys(tree).forEach((key) => {
      printUpdatedFiles(tree[key], depth + 1);
    });
  }
}

module.exports = function patterns(opts, callback) {
  inform.start('☔️');
  _.defaultsDeep(opts, defaultOptions);

  drizzle(opts).then((data) => {
    inform.msg('\nGenerated Templates\n');
    printUpdatedFiles(data);
    if (callback) callback();
  }).catch((err) => console.log('err', err));

  shelljs.mkdir('-p', path.resolve('.', opts.dest.css));
  shelljs.cp(path.resolve(`${__dirname}/../`, pkg.mainDrizzleCSS), path.resolve('.', opts.dest.css));
  shelljs.mkdir(path.resolve('.', opts.dest.js));
  shelljs.cp(path.resolve(`${__dirname}/../`, pkg.mainDrizzleJS), path.resolve('.', opts.dest.js));
};
