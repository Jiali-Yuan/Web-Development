const sample = [ 3, 5, 6, 2, 4, 9 ];

console.log( sample.map( (item) => { return item + 2; } ) );

console.log( sample.map( item => item+2 ));

console.log( sample.map( function(item) { return item+2; } ) );

// map, reduce, filter - see MDN, commonly used in function programming FP




