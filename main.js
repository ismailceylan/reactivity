import { ref, watch, nextTick } from "./src/index.js";

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

console.log( "hello world!" );
// should write at the top of the console

nextTick(() =>
	console.log( "goodbye world!" )
);
// should appear after watch triggered log

setTimeout(() =>
{
	top.value++; top.value++;
	top.value++; top.value++;
	left.value++;
}, 2000 );
// this is a timeout it just waits

// event loop has not any immediate operations left behind
// so microtasks should run at this point
// log => [ 103, 201 ] [ 100, 200 ]

// after 2 seconds
// log => [ 107, 202 ] [ 103, 201 ]
