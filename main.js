import { ref, watch } from "./src/index.js";

const top = ref( 100 );
const left = ref( 200 );

const stop = watch([ top, left ], console.log );

top.value = 101;
left.value = 201;
// two updates should cause just one log
//        new values    old values
// log => [ 101, 201 ]  [ 100, 200 ]

stop();

top.value = 110;
// shouldn't log anything

console.log( top.value );
// log => 110
