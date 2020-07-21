// There is nothing wrong with async/await
//
// I just ban it so you learn "raw" promises first
// which makes dealing with async/await easier once you do

function sync() {
  return 1;
};

const val = sync();
console.log( val ); // 1

function withPromise() {
  return Promise.resolve(2);
}
const val2 = withPromise();
console.log( val2); // the promise
val2.then( val => console.log(val) );// 2
console.log('seen before the 2');

async function demo() {
  const withAsync = async function() {
    return 3;
  };

  const brokenAsync = async function() {
    throw new Error('broke');
  };

  const val3 = withAsync();
  console.log( val3); // A PROMISE!
  val3.then( val => console.log(val) ); // 3
  console.log('seen before the 3');

  // await must be in a function labelled as "async"
  const val4 = await withAsync(); // val4 is NOT a promise
  console.log(val4); // would be 3, except for being top level
  console.log('not seen before the final 3');

  try {
    const val5 = await brokenAsync();
    console.log(val5);
  } catch (err) {
    // catch works because of async/await
    console.log('ERR', err);
  }
}
demo(); // you can call an async function without 'await' (it will return a promise)
