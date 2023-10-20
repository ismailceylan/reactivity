import { ref, watchEffect } from "./src/index.js";

const top = ref( 100 );
const left = ref( 200 );

watchEffect(() =>
{
	console.log( top.value, left.value );
});
// log => 100, 200

top.value = 101;
// log => 101, 200

left.value = 202;
// log => 101, 202

top.value = 101;
// shouldn't any log happen