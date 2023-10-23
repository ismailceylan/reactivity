import { ref, reactive, watchEffect, unref, computed } from "./src/index.js";

const button = document.querySelector( "#increase" );
const delLatest = document.querySelector( "#del-latest" );
const delFirst = document.querySelector( "#del-first" );
const empty = document.querySelector( "#empty" );
const count = document.querySelector( "#count" );
const content = document.querySelector( "#content" );
const currentId = document.querySelector( "#curr-id" );
const price = document.querySelector( "#price" );
const tax = document.querySelector( "#tax" );

const id = ref( 0 );
const books = reactive([]);
const totalPrice = computed(() =>
	books
		.map( book => book.price )
		.reduce(( a, b ) => a + b, 0 )
);
const taxPrice = computed(() => totalPrice.value * .2 );

watchEffect(() =>
{
	content.innerText = JSON.stringify( books );
	count.innerText = books.length;
	currentId.innerText = unref( id );
	price.innerText = totalPrice.value;
	tax.innerText = taxPrice.value;
});

button.addEventListener( "click", createBook );
delLatest.addEventListener( "click", () => books.pop());
delFirst.addEventListener( "click", () => books.shift());
empty.addEventListener( "click", () => books.length = id.value = 0 );

function createBook()
{
	const book_id = unref( id );

	books.push(
	{
		book_id,
		price: Math.round( Math.random() * 249 ),
		title: "Book " + ( book_id + 1)
	});

	id.value++
}
