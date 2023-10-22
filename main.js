import { ref, reactive, watchEffect, unref } from "./src/index.js";

const button = document.querySelector( "#increase" );
const delLatest = document.querySelector( "#del-latest" );
const delFirst = document.querySelector( "#del-first" );
const empty = document.querySelector( "#empty" );
const count = document.querySelector( "#count" );
const content = document.querySelector( "#content" );
const currentId = document.querySelector( "#curr-id" );

const id = ref( 0 );
const books = reactive([]);

watchEffect(() =>
{
	content.innerText = JSON.stringify( books );
	count.innerText = books.length;
	currentId.innerText = unref( id );
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
		title: "Book " + ( book_id + 1)
	});

	id.value++
}
