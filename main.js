import { ref } from "./src/index.js";

const top = ref( 100 );

const unbind = top.bind( console.log );

top.value++;
// log => 101 100

unbind();

top.value = 102;
// shouldn't log anything