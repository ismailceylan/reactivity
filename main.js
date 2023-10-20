import { ref, watch } from "./src/index.js";

const top = ref( 100 );
const left = ref( 200 );

const stop = watch([ top, left ], console.log );

top.value = 101;
// shouldn't log anything
top.value++;
// shouldn't log anything
top.value++;
// shouldn't log anything
left.value++;
// shouldn't log anything

setTimeout(() => {top.value++;top.value++;top.value++;top.value++;top.value++;left.value++;}, 2000 )
// this is a timeout it just waits

// event loop has not any immediate operations left behind
// so microtasks should run at this point
// log => [ 103, 201 ] [ 100, 200 ]

// after 2 seconds
// log => [ 108, 202 ] [ 103, 201 ]
