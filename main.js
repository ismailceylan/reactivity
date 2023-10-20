import { ref, watch } from "./src/index.js";

const top = ref( 100 );

watch( top, console.log );

top.value = 101;
// log => 101 100
