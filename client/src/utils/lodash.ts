import capitalize from 'lodash/capitalize';
import every from 'lodash/every';
import filter from 'lodash/filter';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNaN from 'lodash/isNaN';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isNumber from 'lodash/isNumber';

import keys from 'lodash/keys';
import last from 'lodash/last';
import first from 'lodash/first';
import map from 'lodash/map';
import mean from 'lodash/mean';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import reduce from 'lodash/reduce';
import reverse from 'lodash/reverse';
import slice from 'lodash/slice';
import some from 'lodash/some';
import sortBy from 'lodash/sortBy';

import toString from 'lodash/toString';
import toNumber from 'lodash/toNumber';

import values from 'lodash/values';

// functional programming
import wrap from 'lodash/wrap';
import spread from 'lodash/spread';

export const LodashUtils = Object.freeze({
  get,
  isNil,
  isNaN,
  isNull,
  isEmpty,
  isEqual,
  isNumber,
  toNumber,
  map,
  mean,
  reverse,
  filter,
  last,
  first,
  slice,
  reduce,
  some,
  sortBy,
  every,
  find,
  findIndex,
  includes,
  capitalize,
  toString,
  keys,
  values,
  pick,
  omit,
  wrap,
  spread,
});
