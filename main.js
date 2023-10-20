import { ref } from "./src/index.js";

const xx = ref( "foo" );

xx.bind( console.log );

xx.value = "bar";

// log => foo, bar
