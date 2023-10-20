import { dependencies, ref } from "./src/index.js";

const top = ref( 100 );
const left = ref( 200 );

const deps = dependencies(() =>
{
	console.log( top.value, left.value );
});

console.log( deps );
// [ Ref<100>, Ref<200> ]
