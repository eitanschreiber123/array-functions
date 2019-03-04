import _ from 'lodash';

const pushMultiple = (value, times) => Array.from({length: times}, (v, ) => value);

const flattenEverything = (...a) => a.flat().reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenEverything(val)) : acc.concat(val), []);

const passAll = (value, ...cond) => flattenEverything(cond).map(i => i(value)).every(i => i);

const chunkValues = (arr, ...val) => {
  const r = [0];
  const values = Array.from(flattenEverything(pushMultiple(val, arr.length / val.length)));
  for (let i = 0; i < values.length / val.length; i++) {
    r.push(values[i] + r[r.length - 1]);
  }
  return r;
}

const chunk = (arr, ...val) => arr.reduce((acc, itr, index) => chunkValues(arr, val).some(i => index === i) ? [...acc, [itr]] : [...acc.slice(0, -1), [...acc.slice(-1)[0], itr]],[]);

const takeSkipping = (arr, ...val) => Array.from({length: arr.length}, (_, i) => arr[chunkValues(arr, ...val)[i] - 1]).filter(i => i);

const level = (arr, fn, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  const all = _.flow(...[fn]);
  return chunk(arr, amount).map(i => all(i));
}

const levelAllCondition = (arr, initial, condition, first, second, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  const allInitial = _.flow(...[initial]);
  const allFirst = _.flow(...[first]);
  const allSecond = _.flow(...[second]);
  return chunk(arr, amount).map(i => i.every(j => passAll(j, condition)) ? allFirst(allInitial(i)) : allSecond(allInitial(i)));
}

const levelAnyCondition = (arr, initial, condition, first, second, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  const allInitial = _.flow(...[initial]);
  const allFirst = _.flow(...[first]);
  const allSecond = _.flow(...[second]);
  return chunk(arr, amount).map(i => i.some(j => passAll(j, condition)) ? allFirst(allInitial(i)) : allSecond(allInitial(i)));
}

const levelDown = (arr, fn, howMany = 1, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  let l = level(arr, fn, amount);
  howMany--;
  while (howMany > 0) {
    howMany--;
    l = level(l, fn, amount);
  }
  return l;
}

const levelDownAllCondition = (arr, howMany, initial, condition, func, second, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  let l = levelAllCondition(arr, fn, amount);
  howMany--;
  while (howMany > 0) {
    howMany--;
    l = levelAllCondition(l, fn, amount);
  }
  return l;
}
const levelDownAnyCondition = (arr, howMany, initial, condition, func, second, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  let l = levelAnyCondition(arr, fn, amount);
  howMany--;
  while (howMany > 0) {
    howMany--;
    l = levelAnyCondition(l, fn, amount);
  }
  return l;
}
const startEnd = (a, s, e = s) => [a.slice(0,s), a.slice(a.length - e,a.length)];

const replaceAt = (arr, from, to) => {
  let modified = Array.from(arr);
  modified[from] = arr[to], modified[to] = arr[from];
  return modified;
}

const mapTwo = (arr, second, fn) => {
  const result = [];
  const smaller = Math.min(arr.length, second.length);
  for (var i = 0; i < smaller; i++) {
    result.push(fn(arr[i], second[i]));
  }
  return result;
}

const choice = (arr, initial, condition, first, second) => {
  const allInitial = _.flow(...[initial]);
  const allFirst = _.flow(...[first]);
  const allSecond = _.flow(...[second]);
  return arr.map(i => i instanceof Array ? choice(i, initial, condition, func, second) : condition(allInitial(i)) ? allFirst(allInitial(i)) : allSecond(allInitial(i)));
}

const takeAll = (arr, ...nth) => nth.some(i => i === 1) ? arr : arr.filter((e, i) => nth.some(j => i % j === j - 1));

const overAmounts = (arr, fn, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  const chunked = chunk(arr, amount);
  const cycle = Array.from(flattenEverything(pushMultiple(fn, chunked.length)));
  return chunked.map(i => cycle[chunked.indexOf(i)](i));
}
const overAmountsDown = (arr, fn, howMany = 1, ...amount) => {
  if (!amount[0]) {
    amount = 2;
  }
  let l = overAmounts(arr, fn, amount);
  howMany--;
  while (howMany > 0) {
    howMany--;
    l = overAmounts(l, fn, amount);
  }
  return l;
}
