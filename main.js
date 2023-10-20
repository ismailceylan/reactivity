import { ref, watch } from "./src/index.js";

const top = ref( 100 );

const stop = watch( top, console.log );

top.value = 101;
// log => 101 100

stop();

top.value = 110;
// shouldn't log anything
