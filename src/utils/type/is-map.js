import { default as type } from "./index.js";

export default function isMap( value )
{
	return type( value ) == "[object Map]";
}
