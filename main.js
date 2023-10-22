import { ref, reactive, watchEffect } from "./src/index.js";

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
	currentId.innerText = id.value;
});

button.addEventListener( "click", createBook );
delLatest.addEventListener( "click", () => books.pop());
delFirst.addEventListener( "click", () => books.shift());
empty.addEventListener( "click", () => books.length = id.value = 0 );

function createBook()
{
	books.push(
	{
		id: id.value,
		title: "Book " + ( id.value + 1)
	});

	id.value++
}
