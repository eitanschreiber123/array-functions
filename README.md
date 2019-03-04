# Array-Functions

A collection of random array Functions

```
pushMultiple(value, times);
```
returns an array of 'value' the times number of times
```
pushMultiple(3, 5); // [3, 3, 3, 3, 3];
```
<br/><br/>
```
flattenEverything(...args);
```
recursively flattens it's arguments into one array, arguments can be arrays, primitive values or a combination of both
```
flattenEverything([1,2,3,4,5,[6,7,8,9,10],11,12,13],14,15,16);

[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
```
<br/><br/>
```
chunk(arr, ...values);
```
returns 'arr' split into groups with a length of values, can accept multiple values
```
chunk([1,2,3,4,5,6,7,8,9,10,12,13,14,15], 2, 3);

[[1,2], [3, 4, 5], [6, 7], [8, 9, 10], [11, 12], [13, 14, 15]];
```
<br/><br/>
```
takeSkipping(arr, ...values);
```
returns an array with every nth element in 'arr', can accept multiple Values
```
takeSkipping([1,2,3,4,5,6,7,8,9,10,12,13,14,15], 2, 3);

[2, 5, 7, 10, 12, 15];

//it alternates and takes the second element then the third and alternates between them
```
<br/><br/>
```
takeAll(arr, ...values);
```
returns an array with every nth element in 'arr', can accept multiple Values, different from takeSkipping()
```
takeAll([1,2,3,4,5,6,7,8,9,10,12,13,14,15], 2, 3);

[2, 3, 4, 6, 8, 9, 10, 12, 14, 15];

//it takes every second element and every third element
```
<br/><br/>
```
startEnd(arr, start, end);
```
returns an array with 2 arrays, one with the 'start' number of elements from the beginning of arr and one with the end number of

elements from the end, if end is not provided then it uses start
```
startEnd([1,2,3,4,5,6,7,8,9,10,12,13,14,15], 2, 3);

[[1, 2], [13, 14, 15]];
```
<br/><br/>
```
replaceAt(arr, to, from);
```
returns arr with the element at the index of from at the index of to and the element at the index of to at the index of from
```
replaceAt([1,2,3,4,5,6,7,8,9,10,12,13,14,15], 0, 4);

[5, 2, 3, 4, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
```
<br/><br/>
```
mapTwo(arr, second, fn);
```
calls fn() on each element of arr and second and returns an array of the results, stops at the shorter one
```
const add = (a, b) => a + b;

mapTwo([1,2,3,4,5], [1,2,3,4,5,6,7], add);

[2, 4, 6, 8, 10];
```
<br/><br/>
```
choice(arr, initial, condition, first, second);
```
loops through every element, calls initial on it, then if it passes the condition it calls first() on it if not then it calls second() on it
if the element is an array then it loops through the elements in that array too
initial, condition, first, and second can be either one function or an array of functions in which case it pass
the value through each of the functions in order or for the condition it will test if it passes all of the functions
```
const plusOne = n => n + 1;

const even = n => n % 2 === 0;

const double = n => n * 2;

const three = n => n * 3;

choice([1,2,3,4,5,6,7,8,9], plusOne, even, double, three);

[4, 9, 8, 15, 12, 21, 16, 27, 20];
```
<br/><br/>
```
level(arr, function, ...amount);
```
loops through each 'amount' of elements and calls 'function' on them
'amount' can be one or multiple numbers and if it's not provided it defaults to 2
'function' can be one function or an array of functions in which case it pass the value through each of the functions in order
```
const add = n => n.reduce((a, b) => a + b);

const double = n => n * 2;

level([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], [add, double], 2, 3);

[6, 24, 26, 54, 46, 84];
```
<br/><br/>
```
levelAllCondition(arr, initial, condition, first, second, ...amount);
```
loops through each amount of the array and calls initial and then if every element in the amount passes the condition then it calls first on otherwise it calls second
amount can be one or multiple numbers and if it's not provided it defaults to 2
initial, condition, first, second can be either one function or an array of functions in which case it will pass the value through each of the functions in order or for the condition it will test if it passes all of the functions
condition is called on the individual values whereas initial first and second are all called on the arrays themselves
```
const pushFour = n => {
  n.push(4);
  return n;
}

const lessThanTen = n => n < 10;

const removeLast = n => {
  n.pop();
  return n;
}

const removeFirst = n => {
  n.shift();
  return n;
}

levelAllCondition([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], pushFour, lessThanTen, removeLast, removeFirst, 2, 3);

[1,2] [3,4,5] [6,7] [9,10,4] [12,4] [14,15,4];
```
<br/><br/>
```
levelAnyCondition(arr, initial, condition, first, second, ...amount);
```
same as levelAllCondition() except it checks if only one of the elements in amount passes the condition
```
const pushFour = n => {
  n.push(4);
  return n;
}

const lessThanTen = n => n < 10;

const removeLast = n => {
  n.pop();
  return n;
}

const removeFirst = n => {
  n.shift();
  return n;
}

levelAnyCondition([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], pushFour, lessThanTen, removeLast, removeFirst, 2, 3);

[1,2] [3,4,5] [6,7] [8,9,10] [12,4] [14,15,4];
```
<br/><br/>
```
levelDown(arr, function, howMany = 1, ...amount);
```
calls level() on 'arr', 'function', and 'amount' and calls level() on the result with 'function' and 'amount' and repeats it the 'howMany' number of times
<br/><br/>
```
levelDownAllCondition(arr, howMany = 1, initial, condition, first, second, ...amount);
```
calls levelAllCondition() on 'arr', 'initial', 'condition', 'first', 'second' and 'amount' and calls levelAllCondition() on the result with 'initial', 'condition', 'first', 'second', and 'amount' and repeats it the 'howMany' number of times
<br/><br/>
```
levelDownAnyCondition(arr, howMany = 1, initial, condition, first, second, ...amount);
```
calls levelAnyCondition() on 'arr', 'initial', 'condition', 'first', 'second' and 'amount' and calls levelAnyCondition() on the result with 'initial', 'condition', 'first', 'second', and 'amount' and repeats it the 'howMany' number of times
<br/><br/>
```
overAmounts(arr, functions, ...amount);
```
loops through 'functions' and calls one on each amount in 'arr'
'functions' can be one function or an array of functions
```
const add = n => n.reduce((a, b) => a + b);

const multiply = n => n.reduce((a, b) => a * b);

const biggest = n => Math.max(...n);

overAmounts([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], [multiply, add, biggest], 2, 3);

[2, 12, 7, 720, 23, 15]
```
<br/><br/>
```
overAmountsDown(arr, functions, howMany = 1, ...amount);
```
calls overAmounts() on 'arr', 'functions', and 'amount' and calls overAmounts() on the result with 'functions', and 'amount' and repeats it the 'howMany' number of times
